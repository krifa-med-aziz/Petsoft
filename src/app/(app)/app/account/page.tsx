import { LogOut } from "@/actions/actions";
import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import SignOutBtn from "@/components/SignOutBtn";
import { checkAuth } from "@/lib/server-utils";
import { Metadata } from "next";
import React from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Account",
};

export default async function page() {
  const session = await checkAuth();
  return (
    <main>
      <H1 className="text-white my-8">Your Account</H1>

      <ContentBlock className="min-h-[400px] flex justify-center items-center flex-col gap-4">
        <p className="font-semibold">Logged in as {session.user?.email}</p>
        <form action={LogOut}>
          <SignOutBtn />
        </form>
      </ContentBlock>
    </main>
  );
}
