import { PetContext } from "@/contexts/pet-context";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within PetContextProvider");
  }
  return context;
}
