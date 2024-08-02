import { Outlet } from "react-router-dom";

import Navbar from "@/components/custom/Navbar";
import AuthContextProvider from "@/context/auth/AuthContext.provider";
import QueryClientProvider from "@/providers/QueryClientProvider";

function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <QueryClientProvider>
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
