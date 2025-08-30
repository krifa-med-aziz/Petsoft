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
};

export const PetContext = createContext<PetContextType | null>(null);
