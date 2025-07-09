import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/config/firebase.config";
import { Loader } from "lucide-react";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setIsLoading(true);

      const { email, password } = values;

      await signInWithEmailAndPassword(auth, email, password);

      form.reset();
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        return toast.error("Invalid credentials");
      }

      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="h-10"
                  disabled={isLoading}
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="h-10"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-10 w-full font-semibold"
          disabled={isLoading}
        >
          {isLoading && <Loader className="animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
