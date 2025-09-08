import AppFooter from "@/components/App-footer";
import AppHeader from "@/components/App-header";
import BackgroundPattern from "@/components/BackgroundPattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { TPet } from "@/lib/types";

import React from "react";
import { prisma } from "../../../../prisma/prisma";

export default async function appLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Pets: TPet[] = await prisma.pet.findMany();
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto px-4  flex flex-col h-full">
        <AppHeader />
        <PetContextProvider data={Pets}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
