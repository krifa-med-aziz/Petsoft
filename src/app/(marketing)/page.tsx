import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] py-10 px-4 md:py-0 md:px-0 text-center md:text-left min-h-screen flex flex-col md:flex-row items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={519}
        height={472}
      />

      <div>
        <Logo />
        <h1 className="md:text-5xl text-3xl font-semibold my-6 max-w-[500px] mx-auto md:mx-0">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="md:text-2xl text-lg font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299.
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
