"use client";
import { useOptimistic, useState, useTransition } from "react";
import { PetContext } from "./pet-context";
import { TPet } from "@/lib/types";
import { addPet, checkOutPet, editPet } from "@/actions/actions";
import { toast } from "sonner";

export default function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: TPet[];
}) {
  // state
  const [optimisticPets, setOptimistecPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };
  const handleAddPet = async (newPet: Omit<TPet, "id">) => {
    setOptimistecPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    } else {
      toast.success("Pet added successfully!");
    }
  };
  const handleEditPet = async (petId: string, newPet: Omit<TPet, "id">) => {
    setOptimistecPets({ action: "edit", payload: { id: petId, newPet } });
    const error = await editPet(petId, newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  const handleCheckOutPet = async (petId: string) => {
    startTransition(() => {
      setOptimistecPets({ action: "delete", payload: petId });
    });
    await checkOutPet(petId);
    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        handleChangeSelectedPetId,
        selectedPetId,
        selectedPet,
        numberOfPets,
        searchQuery,
        handleChangeSearchQuery,
        handleAddPet,
        handleEditPet,
        handleCheckOutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
