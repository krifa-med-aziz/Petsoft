import AppFooter from "@/components/App-footer";
import AppHeader from "@/components/App-header";
import BackgroundPattern from "@/components/BackgroundPattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { TPet } from "@/lib/types";
import prisma from "@/lib/db";
import React from "react";

export default async function appLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Pets: TPet[] = await prisma.pet.findMany();
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto px-4 lg:px-0 flex flex-col min-h-screen">
        <AppHeader />
        <PetContextProvider data={Pets}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
