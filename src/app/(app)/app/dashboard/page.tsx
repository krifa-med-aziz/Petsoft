import Branding from "@/components/Branding";
import Stats from "@/components/Stats";
import SearchForm from "@/components/SearchForm";
import ContentBlock from "@/components/ContentBlock";
import PetList from "@/components/PetList";
import PetDetails from "@/components/PetDetails";
import { Metadata } from "next";
import PetButton from "@/components/PetButton";
import { PlusIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dahsboard",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <main>
      <div className="flex justify-between py-8 text-white">
        <Branding />
        <Stats />
      </div>
      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_1fr_500px] gap-4 md:min-h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 relative">
          <ContentBlock>
            <PetList />
            <div className="absolute bottom-4 right-4">
              <PetButton actionType="add">
                <PlusIcon className="h-6 w-6" size={"icon"} />
              </PetButton>
            </div>
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
