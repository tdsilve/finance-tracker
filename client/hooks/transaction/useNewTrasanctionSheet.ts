import { create } from "zustand";

type NewTransactionSheet = {
  open: boolean;
  toggle: () => void;
};

export const useNewTransactionSheet = create<NewTransactionSheet>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
