import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query/client.ts";
import { AppRouter } from "./router/AppRouter.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <Toaster />
            <AppRouter />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   </React.StrictMode>
);
