import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <section className="py-16 border-t border-border">
      <div className="l-container flex items-center justify-center">
        <Card className="max-w-md w-full shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex-col">
            <div className="flex items-center gap-2 w-full">
              <div className="h-[1.5px] border border-solid border-border grow" />
              <p className="text-dark/50">OR</p>
              <div className="h-[1.5px] border border-solid border-border grow" />
            </div>
            <div className="my-3 w-full">
              <Button
                variant="outline"
                className="bg-transparent font-semibold w-full border-border flex items-center gap-2 dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent text-dark/70 hover:text-dark/70 h-10"
              >
                <img src="/google.svg" alt="" className="size-5 invert-50" />
                Google
              </Button>
            </div>
            <p className="text-sm text-muted">
              New here?{" "}
              <Link to="/sign-up" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Login;
