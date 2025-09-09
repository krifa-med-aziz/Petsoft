"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import AuthFormBtn from "./AuthFormBtn";
import { logIn, SignUp } from "@/actions/actions";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, signUpAction] = useFormState(SignUp, { message: "" });
  const [logInError, logInAction] = useFormState(logIn, { message: "" });
  return (
    <form
      action={type === "login" ? logInAction : signUpAction}
      className="flex flex-col gap-y-6"
    >
      <div className="grid w-full </form>max-w-sm items-center gap-3 space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="border-black/50"
          required
          maxLength={100}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="border-black/50"
          required
          maxLength={100}
        />
      </div>
      {signUpError?.message && (
        <p className="text-red-500 text-sm text-center">
          {signUpError.message}
        </p>
      )}
      {logInError?.message && (
        <p className="text-red-500 text-sm text-center">{logInError.message}</p>
      )}
      <AuthFormBtn type={type} />
    </form>
  );
}
