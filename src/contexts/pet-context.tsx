"use client";
import { TPet } from "@/lib/types";
import { createContext } from "react";

type PetContextType = {
  pets: TPet[];
  selectedPetId: string | null;
  selectedPet: TPet | undefined;
  numberOfPets: number;
  searchQuery: string;
  handleChangeSelectedPetId: (id: string) => void;
  handleChangeSearchQuery: (newValue: string) => void;
  handleAddPet: (newPet: Omit<TPet, "id">) => Promise<void>;
  handleEditPet: (petId: string, newPet: Omit<TPet, "id">) => Promise<void>;
  handleCheckOutPet: (petId: string) => Promise<void>;
};

export const PetContext = createContext<PetContextType | null>(null);
