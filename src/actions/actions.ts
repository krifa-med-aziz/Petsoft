"use server";

import { signIn, signOut } from "@/lib/auth";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { prisma } from "../../prisma/prisma";
import bcryptjs from "bcryptjs";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// --- user actions ---
export async function logIn(formData: FormData) {
  const fromDataObject = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(fromDataObject);

  if (!validatedFormData.success) {
    return { message: "Invalid form data." };
  }
  const { email, password } = validatedFormData.data;

  await signIn("credentials", {
    email,
    password,
  });

  redirect("/app/dashboard");
}
export async function SignUp(formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(formDataObject);
  if (!validatedFormData.success) {
    return { message: "Invalid form data." };
  }
  const { email, password } = validatedFormData.data;

  try {
    await prisma.user.create({
      data: {
        email: email,
        hashedPassword: await bcryptjs.hash(password, 10),
      },
    });
    return { success: true };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { message: "Email already exists." };
    }

    return { message: "Could not add user." };
  }
}
export async function LogOut() {
  await signOut({ redirectTo: "/" });
}

// --- pet actions ---
export async function addPet(newPet: unknown) {
  const session = await checkAuth();

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
        userId: session.user.id,
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
  // auth check
  const session = await checkAuth();

  // validation
  const validatePetId = petIdSchema.safeParse(petId);
  const validatePet = petFormSchema.safeParse(pet);
  if (!validatePet.success || !validatePetId.success) {
    return {
      message: "Invalid pet Data!",
    };
  }

  // authorization check
  const existingPet = await getPetById(validatePetId.data);
  if (!existingPet) {
    return { message: "Pet not found!" };
  }
  if (existingPet.userId !== session.user.id) {
    return { message: "Not Authorized!" };
  }

  // database mutation
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
  // auth check
  const session = await checkAuth();

  // validation
  const validatePetId = petIdSchema.safeParse(petId);
  if (!validatePetId.success) {
    return {
      message: "Invalid Pet Data!",
    };
  }

  // authorization check
  const pet = await getPetById(validatePetId.data);
  if (!pet) {
    return { message: "Pet not found!" };
  }
  if (pet.userId !== session.user.id) {
    return { message: "Not Authorized!" };
  }

  // database mutation
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
