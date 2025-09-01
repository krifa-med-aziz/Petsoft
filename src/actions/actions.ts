"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(formData) {
  const data = Object.fromEntries(formData.entries());
  data.age = Number(data.age);
  await sleep(3000);
  try {
    await prisma.pet.create({
      data: {
        name: data.name,
        ownerName: data.ownerName,
        imageUrl:
          data.imageUrl ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: data.age,
        notes: data.notes,
      },
    });
  } catch {
    return {
      message: "Could not add pet!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: string, formData) {
  const data = Object.fromEntries(formData.entries());
  data.age = Number(data.age);
  await sleep(1000);
  try {
    await prisma.pet.update({
      where: {
        id: String(petId),
      },
      data: {
        name: data.name,
        ownerName: data.ownerName,
        age: data.age,
        imageUrl:
          data.imageUrl ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        notes: data.notes,
      },
    });
  } catch {
    return {
      message: "Could not edit the pet!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function checkOutPet(petId: string) {
  await sleep(1000);
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
