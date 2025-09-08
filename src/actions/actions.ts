"use server";

import { signIn, signOut } from "@/lib/auth";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { prisma } from "../../prisma/prisma";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";

// --- user actions ---
export async function logIn(formData: FormData) {
  await signIn("credentials", formData);
}
export async function SignUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await prisma.user.create({
    data: {
      email: email,
      hashedPassword: await bcryptjs.hash(password, 10),
    },
  });
  redirect("/login");
}
export async function LogOut() {
  await signOut();
}

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
