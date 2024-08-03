import useAuthContext from "@/context/auth/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  if (isLoggedIn) return children;
  else navigate("/login", { state: { from: window.location.pathname } });
}
