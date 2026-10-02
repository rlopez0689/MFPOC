import { createContext, useMemo, type ReactNode } from "react";

export interface AppContextValue {
  currentUser: { id: number; displayName: string };
  tenantId: string;
  appTheme: string;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AppContextValue>(() => ({
    currentUser: { id: 1, displayName: "Alex Morgan" },
    tenantId: "northwind-demo",
    appTheme: "violet"
  }), []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
