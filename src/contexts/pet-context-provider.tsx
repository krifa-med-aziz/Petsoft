"use client";
import { useState } from "react";
import { PetContext } from "./pet-context";
import { TPet } from "@/lib/types";
import { addPet } from "@/actions/actions";

export default function PetContextProvider({
  children,
  data: pets,
}: {
  children: React.ReactNode;
  data: TPet[];
}) {
  // state
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };
  // const handleCheckoutpet = (id: string) => {
  //   setPets((prev) => prev.filter((pet) => pet.id !== id));
  //   setSelectedPetId(null);
  // };
  const handleAddPet = async (newPet: Omit<TPet, "id">) => {
    await addPet(newPet);
  };
  // const handleEditpet = (petId: string, updatedPet: Omit<TPet, "id">) => {
  //   setPets((prev) =>
  //     prev.map((pet) => {
  //       if (pet.id === petId) {
  //         return { ...updatedPet, id: petId };
  //       }
  //       return pet;
  //     })
  //   );
  // };

  return (
    <PetContext.Provider
      value={{
        pets,
        handleChangeSelectedPetId,
        selectedPetId,
        selectedPet,
        numberOfPets,
        searchQuery,
        handleChangeSearchQuery,
        // handleCheckoutpet,
        handleAddPet,
        // handleEditpet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
