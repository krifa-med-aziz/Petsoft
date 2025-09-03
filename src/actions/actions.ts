"use server";

import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

// --- user actions ---
// export async function logIn(formData: FormData) {
//   const authData = Object.fromEntries(formData.entries());
//   await signIn("credentials", authData);
// }

// --- pet actions ---
export async function addPet(newPet: unknown) {
  const validatePet = petFormSchema.safeParse(newPet);
  if (!validatePet.success) {
    return {
      message: "Invalid pet Data",
    };
  }
  try {
    await prisma.pet.create({
      data: {
        ...validatePet.data,
        imageUrl: validatePet.data.imageUrl ?? "",
        notes: validatePet.data.notes ?? "",
      },
    });
  } catch {
    return {
      message: "Could not add pet!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, pet: unknown) {
  const validatePetId = petIdSchema.safeParse(petId);
  const validatePet = petFormSchema.safeParse(pet);
  if (!validatePet.success || !validatePetId.success) {
    return {
      message: "Invalid pet Data!",
    };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatePetId.data,
      },
      data: validatePet.data,
    });
  } catch {
    return {
      message: "Could not edit the pet!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function checkOutPet(petId: unknown) {
  const validatePetId = petIdSchema.safeParse(petId);
  if (!validatePetId.success) {
    return {
      message: "Invalid Pet Data!",
    };
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatePetId.data,
      },
    });
  } catch {
    return {
      message: "Could not delete pet!",
    };
  }
  revalidatePath("/app", "layout");
}
