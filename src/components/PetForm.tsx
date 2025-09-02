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
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { petFormSchema } from "@/lib/validations";

type PetFormPorps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export function PetForm({ actionType, onFormSubmission }: PetFormPorps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const form = useForm<z.infer<typeof petFormSchema>>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: String(selectedPet?.age),
            notes: selectedPet?.notes,
          }
        : {
            name: "",
            ownerName: "",
            imageUrl: "",
            age: "",
            notes: "",
          },
  });

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          const isValid = await form.trigger();
          if (!isValid) return;

          const petData = {
            name: formData.get("name") as string,
            ownerName: formData.get("ownerName") as string,
            imageUrl: (formData.get("imageUrl") as string) || DEFAULT_PET_IMAGE,
            age: String(formData.get("age")),
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
              <FormLabel>
                Name<span className="text-red-600">*</span>
              </FormLabel>
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
              <FormLabel>
                Owner Name <span className="text-red-600">*</span>
              </FormLabel>
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
              <FormLabel>
                Age <span className="text-red-600">*</span>
              </FormLabel>
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
