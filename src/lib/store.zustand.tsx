import { create } from "zustand";

interface EvaluationSelecType {
  planid: string;
  setPlanid: (planid: string) => void;
}
export const useEvaluationSelect = create<EvaluationSelecType>((set) => ({
  planid: "",
  setPlanid: (planid) => set((state) => ({ ...state, planid })),
}));
