import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Home() {
  return (
    <main className="flex flex-col justify-center gap-y-3 items-center px-4 text-center">
      <H1>Log In</H1>
      <AuthForm type="login" />
      <p className="mt-2 text-zinc-500 text-sm">
        No account yet?{" "}
        <Link href="/signup" className="font-bold">
          Sing up
        </Link>
      </p>
    </main>
  );
}
