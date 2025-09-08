import { PetContext } from "@/contexts/pet-context";
import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within PetContextProvider");
  }
  return context;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }
  return context;
}
