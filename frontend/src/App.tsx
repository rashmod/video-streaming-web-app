import { Outlet } from "react-router-dom";

import Navbar from "@/components/custom/Navbar";

function App() {
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
