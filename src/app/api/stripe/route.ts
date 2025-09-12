import { prisma } from "../../../../prisma/prisma";
import Stripe from "stripe";

// Initialize Stripe with build-time safety
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

let stripe: Stripe | null = null;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-08-27.basil",
  });
}

export async function POST(request: Request) {
  // Check if Stripe is initialized at runtime
  if (!stripe) {
    console.error("Stripe is not properly configured");
    return Response.json(
      { error: "Stripe configuration error" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.log("Missing Stripe signature");
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Missing STRIPE_WEBHOOK_SECRET");
    return Response.json({ error: "Missing webhook secret" }, { status: 500 });
  }

  // verify webhook came from Stripe
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Webhook verification failed", error.message);
    } else {
      console.log("Webhook verification failed", error);
    }
    return Response.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  // fulfill order
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_email;

        if (!customerEmail) {
          console.log("No customer email in checkout session");
          break;
        }

        const updatedUser = await prisma.user.update({
          where: {
            email: customerEmail,
          },
          data: {
            hasAccess: true,
          },
        });

        console.log(`Successfully granted access to user: ${customerEmail}`);
        console.log(`Updated user ID: ${updatedUser.id}`);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return Response.json(
      { error: "Internal processing error" },
      { status: 500 }
    );
  }

  // return 200 ok
  return Response.json({ received: true }, { status: 200 });
}
