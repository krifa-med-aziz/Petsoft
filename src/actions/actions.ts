"use server";

import prisma from "@/lib/db";
import { TPet } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function addPet(newPet: Omit<TPet, "id">) {
  try {
    await prisma.pet.create({
      data: newPet,
    });
  } catch {
    return {
      message: "Could not add pet!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: string, pet: Omit<TPet, "id">) {
  try {
    await prisma.pet.update({
      where: {
        id: String(petId),
      },
      data: pet,
    });
  } catch {
    return {
      message: "Could not edit the pet!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function checkOutPet(petId: string) {
  try {
    await prisma.pet.delete({
      where: {
        id: String(petId),
      },
    });
  } catch {
    return {
      message: "Could not delete pet!",
    };
  }
  revalidatePath("/app", "layout");
}
