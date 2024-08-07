import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/custom/PasswordInput";
import useAuthContext from "@/context/auth/useAuthContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

type LogInSchema = z.infer<typeof schema>;

export default function LogIn() {
  const form = useForm<LogInSchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const {
    login: { action: login, error, isLoading, isError },
    token: { isLoggedIn },
  } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  const onSubmit: SubmitHandler<LogInSchema> = (data) => {
    console.log(data);
    login({ email: data.email, password: data.password });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <div>
        <p>{JSON.stringify(error, null, 2)}</p>
        <p>Error</p>
      </div>
    );

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Log In</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p className="text-center text-sm">
          Don't have an account?
          <Link to="/register">
            <Button variant="link" size="sm" className="pl-1">
              Register
            </Button>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
