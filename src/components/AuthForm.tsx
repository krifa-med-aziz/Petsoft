import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, SignUp } from "@/actions/actions";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form
      action={type === "login" ? logIn : SignUp}
      className="flex flex-col gap-y-6"
    >
      <div className="grid w-full </form>max-w-sm items-center gap-3 space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="border-black/50"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="border-black/50"
        />
      </div>
      <Button>{type === "login" ? "Log In" : "Sign Up"}</Button>
    </form>
  );
}
