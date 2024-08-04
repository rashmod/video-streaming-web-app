import useAuthContext from "@/context/auth/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { isLoggedIn, isLoading },
  } = useAuthContext();
  const navigate = useNavigate();

  console.log("protected route", { isLoggedIn, isLoading });

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      console.log("redirecting");
      navigate("/log-in", { state: { from: window.location.pathname } });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoggedIn) return children;
}
