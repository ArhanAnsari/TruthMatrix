import { create } from "zustand";

interface AnalysisResult {
  credibilityScore?: number;
  authenticityScore?: number;
  classification: string;
  confidence: number;
  reasoning: string;
  [key: string]: unknown;
}

interface AppStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  analysisResult: null,
  setAnalysisResult: (result) => set({ analysisResult: result }),
  error: null,
  setError: (error) => set({ error }),
}));
