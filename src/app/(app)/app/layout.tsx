import AppFooter from "@/components/App-footer";
import AppHeader from "@/components/App-header";
import BackgroundPattern from "@/components/BackgroundPattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { TPet } from "@/lib/types";
import React from "react";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";

export default async function appLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAuth();
  const Pets: TPet[] = await getPetsByUserId(session.user.id);
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
