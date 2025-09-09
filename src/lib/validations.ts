import z from "zod";

export const petIdSchema = z.string().cuid();
export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters." })
    .nonoptional(),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner name is required" })
    .max(100, { message: "Owner name must be less than 100 characters." }),
  imageUrl: z
    .string()
    .trim()
    .url({ message: "Image URL must be a valid URL." })
    .optional()
    .or(z.literal("")),
  age: z
    .string()
    .min(1, { message: "Age is required" })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0 && num < 100;
      },
      { message: "Age must be an integer between 1 and 99." }
    ),
  notes: z
    .string()
    .trim()
    .max(1000, { message: "Notes must be less than 1000 characters." })
    .optional()
    .or(z.literal("")),
});

export const authSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 8 characters long." })
    .max(100, { message: "Password must be less than 100 characters." }),
});
