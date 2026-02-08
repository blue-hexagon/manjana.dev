// glossary/GlossaryContext.tsx
import { createContext, useContext } from "react";

export const GlossaryContext = createContext<string | null>(null);

export function useGlossaryPrefix() {
    return useContext(GlossaryContext);
}