import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import "./index.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } });
const container = document.getElementById("root");
if (!container) throw new Error("Missing #root element in the HTML template.");

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider><BrowserRouter><App /></BrowserRouter></AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
