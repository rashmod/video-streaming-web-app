import AuthContextProvider from "@/context/auth/AuthContext.provider";
import QueryClientProvider from "./QueryClientProvider";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
}
