import { createContext } from "react";

export type userContextProps = {
  handleAddUser: (formData: FormData) => Promise<void>;
};

export const UserContext = createContext<userContextProps | null>(null);
