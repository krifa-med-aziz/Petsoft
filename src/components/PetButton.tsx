import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "./ui/dialog";

import PetForm from "./PetForm";

type PetButtonProps = {
  actionType: "add" | "checkout" | "edit";
  children: React.ReactNode;
  handleClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  handleClick,
}: PetButtonProps) {
  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={handleClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">{children}</Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill out the form to add or edit a pet.
        </DialogDescription>
        <PetForm
        // actionType={actionType}
        // onFormSubmission={() => {
        //   flushSync(() => {
        //     setIsFormOpen(false);
        //   });
        // }}
        />
      </DialogContent>
    </Dialog>
  );
}
