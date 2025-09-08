"use client";
import React from "react";
import { UserContext } from "./user-context";
import { SignUp } from "@/actions/actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleAddUser = async (formData: FormData) => {
    const result = await SignUp(formData);
    if (result && "message" in result) {
      toast.warning(result.message);
      return;
    } else if (result && "success" in result) {
      toast.success("User added successfully!");
      redirect("/login");
    }
  };
  return (
    <UserContext.Provider value={{ handleAddUser }}>
      {children}
    </UserContext.Provider>
  );
}
