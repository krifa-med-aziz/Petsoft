import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex flex-col justify-center gap-y-3 items-center px-4">
      <H1>Sign Up</H1>
      <AuthForm type="signup" />
      <p className="mt-2 text-sm text-zinc-500">
        Already have an account ?{" "}
        <Link href="/login" className="font-bold">
          Sing up
        </Link>
      </p>
    </main>
  );
}
