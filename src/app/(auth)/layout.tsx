import Logo from "@/components/Logo";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className=" gap-y-5 flex flex-col justify-center items-center p-4 rounded-md">
        <Logo />
        {children}
      </div>
    </div>
  );
}
