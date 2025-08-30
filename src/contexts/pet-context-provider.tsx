"use client";
import { useState } from "react";
import { PetContext } from "./pet-context";
import { TPet } from "@/lib/types";

export default function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: TPet[];
}) {
  // state
  const [pets, setPets] = useState<TPet[]>(data);
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
  const handleCheckoutpet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };
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
        handleCheckoutpet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
