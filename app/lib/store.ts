import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

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

// Analysis History Store
export interface Analysis {
  id: string;
  type: "image" | "video" | "text";
  fileName: string;
  description: string;
  analysis: string;
  timestamp: number;
  confidence: number;
  isFavorite: boolean;
}

export interface AnalysisStats {
  total: number;
  byType: {
    image: number;
    video: number;
    text: number;
  };
  avgConfidence: number;
}

interface AnalysisStore {
  analyses: Analysis[];
  addAnalysis: (analysis: Omit<Analysis, "id" | "timestamp" | "isFavorite">) => void;
  removeAnalysis: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getAnalyses: () => Analysis[];
  getStats: () => AnalysisStats;
}

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
  analyses: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("truthmatrix_analyses") || "[]") : [],

  addAnalysis: (analysis) => {
    const newAnalysis: Analysis = {
      ...analysis,
      id: uuidv4(),
      timestamp: Date.now(),
      isFavorite: false,
    };

    set((state) => {
      const updated = [newAnalysis, ...state.analyses];
      if (typeof window !== "undefined") {
        localStorage.setItem("truthmatrix_analyses", JSON.stringify(updated));
      }
      return { analyses: updated };
    });
  },

  removeAnalysis: (id) => {
    set((state) => {
      const updated = state.analyses.filter((a) => a.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("truthmatrix_analyses", JSON.stringify(updated));
      }
      return { analyses: updated };
    });
  },

  toggleFavorite: (id) => {
    set((state) => {
      const updated = state.analyses.map((a) =>
        a.id === id ? { ...a, isFavorite: !a.isFavorite } : a
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("truthmatrix_analyses", JSON.stringify(updated));
      }
      return { analyses: updated };
    });
  },

  getAnalyses: () => get().analyses,

  getStats: () => {
    const analyses = get().analyses;
    return {
      total: analyses.length,
      byType: {
        image: analyses.filter((a) => a.type === "image").length,
        video: analyses.filter((a) => a.type === "video").length,
        text: analyses.filter((a) => a.type === "text").length,
      },
      avgConfidence:
        analyses.length > 0 ? analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length : 0,
    };
  },
}));
