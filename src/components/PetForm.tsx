"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormButton from "./PetFormButton";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  ownerName: z.string().min(2, {
    message: "OwnerName must be at least 2 characters.",
  }),
  imageUrl: z.string(),
  age: z.string().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Age must be a positive number.",
    }
  ),
  notes: z.string(),
});

type PetFormPorps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export function PetForm({ actionType, onFormSubmission }: PetFormPorps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues:
      selectedPet && actionType === "add"
        ? {
            name: "",
            ownerName: "",
            imageUrl: "",
            age: "",
            notes: "",
          }
        : {
            name: selectedPet?.name ?? "",
            ownerName: selectedPet?.ownerName ?? "",
            imageUrl: selectedPet?.imageUrl ?? "",
            age: selectedPet?.age !== undefined ? String(selectedPet.age) : "",
            notes: selectedPet?.notes ?? "",
          },
  });

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          const petData = {
            name: formData.get("name") as string,
            ownerName: formData.get("ownerName") as string,
            imageUrl:
              (formData.get("imageUrl") as string) ||
              "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
            age: Number(formData.get("age")),
            notes: formData.get("notes") as string,
          };
          if (actionType === "add") {
            handleAddPet(petData);
          } else if (actionType === "edit" && selectedPet) {
            handleEditPet(selectedPet.id, petData);
          }
          onFormSubmission();
        }}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" id="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input id="ownername" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input id="imageUrl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input id="age" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  id="notes"
                  {...field}
                  rows={3}
                  className="overflow-y-scroll resize-none h-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PetFormButton actionType={actionType} />
      </form>
    </Form>
  );
}
