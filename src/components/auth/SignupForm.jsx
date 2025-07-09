import React, { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupSchema } from "@/schema/auth";

const SignupForm = () => {
  const [avatarPreview, setAvatarPreview] = useState("");

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <>
      <div className="mb-2">
        <div className="relative">
          <Label
            className="cursor-pointer inline-flex relative"
            htmlFor="user-avatar"
          >
            <img
              src={
                avatarPreview
                  ? URL.createObjectURL(avatarPreview)
                  : "/placeholder.png"
              }
              className="size-14 object-cover object-center rounded-full"
            />
            <Button className="absolute right-0 bottom-0 has-[>svg]:px-0 h-auto py-0 size-5 rounded-full bg-primary/80 text-white">
              <Plus />
            </Button>
          </Label>
          <Input
            type={"file"}
            id="user-avatar"
            className={"absolute hidden"}
            onChange={(e) => setAvatarPreview(e.target.files[0])}
          />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className={"h-10"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className={"h-10"}
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
                    className={"h-10"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your typed password"
                    className={"h-10"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="font-semibold h-10 w-full">
            Create Account
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
