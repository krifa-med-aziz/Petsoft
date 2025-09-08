import AppFooter from "@/components/App-footer";
import AppHeader from "@/components/App-header";
import BackgroundPattern from "@/components/BackgroundPattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { TPet } from "@/lib/types";

import React from "react";
import { prisma } from "../../../../prisma/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function appLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const Pets: TPet[] = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });
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
