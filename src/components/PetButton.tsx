"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "./ui/dialog";
import { PetForm } from "./PetForm";
import { flushSync } from "react-dom";

type PetButtonProps = {
  actionType: "add" | "checkout" | "edit";
  children: React.ReactNode;
  handleClick?: () => void;
  disabled?: boolean;
};

export default function PetButton({
  actionType,
  children,
  handleClick,
  disabled,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" disabled={disabled} onClick={handleClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
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
          Fill out the form to {actionType === "add" ? "add" : "edit"} a pet
        </DialogDescription>
        <PetForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
