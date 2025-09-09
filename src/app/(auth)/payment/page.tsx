"use client";
import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <main className="flex flex-col items-center gap-y-6">
      <H1>PetSoft access requires payment</H1>
      <Button
        onClick={async () => {
          await createCheckoutSession();
        }}
      >
        Buy Lifetime access for $299
      </Button>
    </main>
  );
}
