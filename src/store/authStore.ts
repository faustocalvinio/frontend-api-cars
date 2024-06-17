import { create } from "zustand";

type User = {
   name?: string;
};

type Status = "checking" | "not-authenticated" | "authenticated";

interface AuthStore {
   user: User;
   setUser: (user: User) => void;
   status: Status;
   errorMessage: string;
   setStatus: (status: Status) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
   user: {},
   status: "not-authenticated",
   errorMessage: "",
   setUser: (user: User) => set({ user }),
   setStatus: (status: Status) => set({ status }),
}));
