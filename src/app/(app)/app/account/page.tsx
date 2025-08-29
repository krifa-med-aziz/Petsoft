import H1 from "@/components/H1";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account",
};

export default function page() {
  return (
    <main>
      <H1>Account</H1>
    </main>
  );
}
