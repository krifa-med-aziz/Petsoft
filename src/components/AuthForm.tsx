import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AuthForm() {
  return (
    <form className="flex flex-col gap-y-6">
      <div className="grid w-full max-w-sm items-center gap-3 space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="border-black/50"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          className="border-black/50"
        />
      </div>
      <Button>Log In</Button>
    </form>
  );
}
