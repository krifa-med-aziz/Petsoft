"use client";
import { usePetContext } from "@/lib/hooks";
import { TPet } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PetList() {
  const { pets, handleChangeSelectedPetId, selectedPetId, searchQuery } =
    usePetContext();
  const filteredPets: TPet[] = pets.filter((pet) =>
    pet.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  if (pets.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-center px-4 min-h-[200px]">
        <div className="flex flex-col items-center">
          <p className="text-black/50 mb-2">No pets available yet!</p>
          <span className="text-sm text-black/30">
            Add your first pet to get started.
          </span>
        </div>
      </div>
    );
  }

  if (filteredPets.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-center px-4 min-h-[200px]">
        <div className="flex flex-col items-center">
          <p className="text-black/50 mb-2">No pets match your search.</p>
          <span className="text-sm text-black/30">
            Try adjusting your search or add a new pet!
          </span>
        </div>
      </div>
    );
  }

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "flex items-center h-[70px] w-full cursor-pointer px-4 text-base gap-3 hover:bg-[#EFF1F2]  transition",
              {
                "bg-[#EFF1F2]": pet.id === selectedPetId,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
