import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/app/dashboard");
  return (
    <main className="flex flex-col justify-center gap-y-3 items-center px-4">
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
