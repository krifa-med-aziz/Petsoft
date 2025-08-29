import AppFooter from "@/components/App-footer";
import AppHeader from "@/components/App-header";
import BackgroundPattern from "@/components/BackgroundPattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { TPet } from "@/lib/types";
import React from "react";

export default async function appLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!response.ok) {
    throw new Error("Could not fetch pets");
  }
  const data: TPet[] = await response.json();
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto px-4 lg:px-0 flex flex-col min-h-screen">
        <AppHeader />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
