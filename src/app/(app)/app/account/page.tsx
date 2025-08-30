import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account",
};

export default function page() {
  return (
    <main>
      <H1 className="text-white my-8">Your Account</H1>

      <ContentBlock className="min-h-[400px] flex justify-center items-center">
        <p className="font-semibold">Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}
