import useAuthContext from "@/context/auth/useAuthContext";

export default function LoggedIn({ children }: { children: React.ReactNode }) {
  const {
    token: { isLoggedIn },
  } = useAuthContext();

  if (isLoggedIn) return children;
}
