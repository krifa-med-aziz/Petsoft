import Branding from "@/components/Branding";
import Stats from "@/components/Stats";
import SearchForm from "@/components/SearchForm";
import ContentBlock from "@/components/ContentBlock";
import PetList from "@/components/PetList";
import PetDetails from "@/components/PetDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dahsboard",
};

export default async function page() {
  return (
    <main>
      <div className="flex justify-between py-8 text-white">
        <Branding />
        <Stats />
      </div>
      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList />
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
