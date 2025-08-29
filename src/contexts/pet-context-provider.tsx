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

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  // event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  return (
    <PetContext.Provider
      value={{ pets, handleChangeSelectedPetId, selectedPetId, selectedPet }}
    >
      {children}
    </PetContext.Provider>
  );
}
