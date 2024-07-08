import React, { Suspense } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// ** Router Import
import Router from "./router/Router";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
