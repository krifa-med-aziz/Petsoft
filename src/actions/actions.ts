"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addPet(formData) {
  const data = Object.fromEntries(formData.entries());
  data.age = Number(data.age);
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
  revalidatePath("/app", "layout");
}
