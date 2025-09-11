"use client";
import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import { redirect, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const { data: session, update, status } = useSession();
  return (
    <main className="flex flex-col items-center gap-y-6">
      <H1>PetSoft access requires payment</H1>
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
    </main>
  );
}
