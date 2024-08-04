import { Outlet } from "react-router-dom";

import Navbar from "@/components/custom/Navbar";
import useAuthContext from "./context/auth/useAuthContext";
import { setupAxiosInterceptor } from "./utilities/axios";

function App() {
  const {
    token: { setAccessToken },
  } = useAuthContext();
  setupAxiosInterceptor(setAccessToken);
  return (
    <main className="flex min-h-screen flex-col">
      <section className="container flex grow flex-col">
        <Navbar>
          <Outlet />
        </Navbar>
      </section>
    </main>
  );
}

export default App;
