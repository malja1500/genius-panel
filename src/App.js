import React, { Suspense } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// ** Router Import
import Router from "./router/Router";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
