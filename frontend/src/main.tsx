import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import App from "./App";
import Home from "./pages/Home.page";
import Watch from "./pages/Watch.page";
import Upload from "./pages/Upload.page";
import LogIn from "./pages/LogIn.page";
import Register from "./pages/Register.page";
import User from "./pages/User.page";
import Profile from "./pages/Profile.page";
import GlobalProvider from "./providers/GlobalProvider";
import ProtectedRoute from "./components/custom/auth/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GlobalProvider>
        <App />
      </GlobalProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/watch", element: <Watch /> },
      { path: "/upload", element: <Upload /> },
      { path: "/user/:id", element: <User /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "/log-in", element: <LogIn /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
