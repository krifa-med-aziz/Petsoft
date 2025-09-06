import { LogOut } from "@/actions/actions";
import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Account",
};

export default async function page() {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <main>
      <H1 className="text-white my-8">Your Account</H1>

      <ContentBlock className="min-h-[400px] flex justify-center items-center flex-col gap-4">
        <p className="font-semibold">Logged in as {session.user?.email}</p>
        <form action={LogOut}>
          <Button variant={"destructive"}>Log Out</Button>
        </form>
      </ContentBlock>
    </main>
  );
}
