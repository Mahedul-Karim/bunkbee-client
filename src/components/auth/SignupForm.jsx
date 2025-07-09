import React, { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, Plus } from "lucide-react";
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
import { useStore } from "@/store/Provider";
import { toast } from "sonner";
import { useAxios } from "@/hooks/useAxios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/config/firebase.config";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { handleUser } = useStore();

  const { axiosInstance } = useAxios();

  const [avatarPreview, setAvatarPreview] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { fullName, email, password } = values;

      await createUserWithEmailAndPassword(auth, email, password);

      const formData = new FormData();

      formData.append("image", avatarPreview);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        {
          body: formData,
          method: "POST",
        }
      );

      const imgData = await imgRes.json();

      const avatar = imgData?.data?.url;

      const { data } = await axiosInstance({
        url: "user",
        data: {
          fullName,
          email,
          avatar,
        },
        method: "POST",
      });

      handleUser(data?.user, data?.token);
      toast.success(data?.message);
      setAvatarPreview("");
      form.reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className={"h-10"}
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
                    className={"h-10"}
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your typed password"
                    className={"h-10"}
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
            className="font-semibold h-10 w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader className="animate-spin" />}
            Create Account
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
