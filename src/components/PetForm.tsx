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
import { addPet, editPet } from "@/actions/actions";
import PetFormButton from "./PetFormButton";
import { toast } from "sonner";

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
  const { selectedPet } = usePetContext();

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
  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   // if (!selectedPet) return;
  //   const pet: Omit<TPet, "id"> = {
  //     ...data,
  //     age: Number(data.age),
  //     imageUrl:
  //       data.imageUrl.trim() === ""
  //         ? "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
  //         : data.imageUrl,
  //   };
  //   if (actionType === "add") {
  //     handleAddPet(pet);
  //   }
  //   if (actionType === "edit") {
  //     handleEditpet(selectedPet!.id, pet);
  //   }
  //   onFormSubmission();
  // }

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          if (actionType === "add") {
            const error = await addPet(formData);
            if (error) {
              toast.warning(error.message);
              return;
            } else {
              toast.success("Pet added successfully!");
            }
          } else if (actionType === "edit" && selectedPet) {
            const error = await editPet(selectedPet.id, formData);
            if (error) {
              toast.warning(error.message);
              return;
            }
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
