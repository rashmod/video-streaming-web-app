import { createContext } from "react";
import { UseMutateFunction } from "react-query";

type MutationContext<T> = {
  action: UseMutateFunction<T>;
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
};

type AuthContext = {
  register: MutationContext<{ data: string }>;
  login: MutationContext<{ data: string }>;
  logout: Omit<MutationContext<{ data: string }>, "data">;
};

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
