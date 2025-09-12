"use client";
import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import { redirect, useSearchParams } from "next/navigation";
import { useTransition, Suspense } from "react";
import { useSession } from "next-auth/react";

function PaymentContent() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const { data: session, update, status } = useSession();

  return (
    <>
      {searchParams.get("success") && (
        <Button
          disabled={status === "loading" || session?.user.hasAccess}
          onClick={async () => {
            await update(true);
            redirect("/app/dashboard");
          }}
        >
          Access PetSoft
        </Button>
      )}
      {!searchParams.get("success") && (
        <Button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy Lifetime access for $299
        </Button>
      )}
      {searchParams.get("success") && (
        <p className="text-sm text-green-700">
          Payment successful! You now have lifetime access to PetSoft.
        </p>
      )}
      {searchParams.get("cancelled") && (
        <p className="text-sm text-red-700">
          Payment cancelled. You can try again.
        </p>
      )}
    </>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col items-center gap-y-6 text-center">
      <H1>PetSoft access requires payment</H1>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentContent />
      </Suspense>
    </main>
  );
}
