import { create } from "zustand";

type NewAccountSheet = {
  open: boolean;
  toggle: () => void;
};

export const useNewAccountSheet = create<NewAccountSheet>((set) => ({
  open: true,
  toggle: () => set((state) => ({ open: !state.open })),
}));
