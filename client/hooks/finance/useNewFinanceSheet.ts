import { create } from "zustand";

type NewFinanceSheet = {
  open: boolean;
  toggle: () => void;
};

export const useNewFinanceSheet = create<NewFinanceSheet>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
