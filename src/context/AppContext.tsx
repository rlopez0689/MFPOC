import { createContext, type ReactNode } from "react";

export interface AppContextValue {
  currentUser: { id: number; displayName: string };
  tenantId: string;
  appTheme: string;
}

export const defaultAppContext: AppContextValue = {
  currentUser: { id: 1, displayName: "Alex Morgan" },
  tenantId: "northwind-demo",
  appTheme: "violet"
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({
  children,
  value = defaultAppContext
}: {
  children: ReactNode;
  value?: AppContextValue;
}) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
