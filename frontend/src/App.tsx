import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "@/components/custom/Navbar";
import AuthContextProvider from "@/context/auth/AuthContext.provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <section className="container flex grow flex-col">
            <Navbar>
              <Outlet />
            </Navbar>
          </section>
        </AuthContextProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
