"use client";
import { usePetContext } from "@/lib/hooks";
import { TPet } from "@/lib/types";
import Image from "next/image";
import PetButton from "./PetButton";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="w-full h-full flex flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <Topbar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <p className="h-full flex justify-center items-center text-2xl font-medium">
      No pet selected
    </p>
  );
}

function Topbar({ pet }: { pet: TPet }) {
  const { handleCheckOutPet } = usePetContext();
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-5 sm:gap-0 bg-white px-8 py-5 border-b border-light">
        <Image
          src={pet.imageUrl}
          alt="Selected pet image"
          height={75}
          width={75}
          className="h-[75px] w-[75px] rounded-full object-cover"
        />

        <h2 className="text-3xl font-semibold leading-7 sm:ml-5">
          {capitalizeFirstLetter(pet.name)}
        </h2>
        <div className="sm:ml-auto space-x-2">
          <PetButton actionType="edit">Edit</PetButton>
          <PetButton
            handleClick={async () => await handleCheckOutPet(pet.id)}
            actionType="checkout"
          >
            Checkout
          </PetButton>
        </div>
      </div>
    </>
  );
}

function OtherInfo({ pet }: { pet: TPet }) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">
          {capitalizeFirstLetter(pet.ownerName)}
        </p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: { pet: TPet }) {
  return (
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
      {pet.notes ? pet.notes : "No notes available."}
    </section>
  );
}
