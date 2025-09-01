import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFormButton({
  actionType,
}: {
  actionType: "add" | "edit";
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="block mx-auto sm:mx-0 sm:ml-auto"
    >
      {pending && actionType === "add"
        ? "Adding new Pet..."
        : pending && actionType === "edit"
        ? "Editing the Pet"
        : actionType === "add"
        ? "Add new Pet"
        : "Edit Pet"}
    </Button>
  );
}
