import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserWidget from "../components/UserWidget/UserWidget";
import { AppProvider, defaultAppContext } from "../context/AppContext";

export interface UserWidgetRemoteProps {
  userId?: number;
  tenantId?: string;
  appTheme?: string;
}

const remoteQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } }
});

export default function UserWidgetEntry({
  userId = defaultAppContext.currentUser.id,
  tenantId = defaultAppContext.tenantId,
  appTheme = defaultAppContext.appTheme
}: UserWidgetRemoteProps) {
  const contextValue = {
    currentUser: { ...defaultAppContext.currentUser, id: userId },
    tenantId,
    appTheme
  };

  return (
    <QueryClientProvider client={remoteQueryClient}>
      <AppProvider value={contextValue}><UserWidget /></AppProvider>
    </QueryClientProvider>
  );
}
