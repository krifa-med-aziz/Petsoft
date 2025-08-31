"use client";
import { TPet } from "@/lib/types";
import { createContext } from "react";

type PetContextType = {
  pets: TPet[];
  handleChangeSelectedPetId: (id: string) => void;
  selectedPetId: string | null;
  selectedPet: TPet | undefined;
  numberOfPets: number;
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
  handleCheckoutpet: (id: string) => void;
  handleAddPet: (newPet: Omit<TPet, "id">) => Promise<void>;
  handleEditpet: (petId: string, updatedPet: Omit<TPet, "id">) => void;
};

export const PetContext = createContext<PetContextType | null>(null);
