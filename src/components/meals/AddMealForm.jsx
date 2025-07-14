import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { mealSchema } from "@/schema/meal";
import Title from "./meal-form/Title";
import Category from "./meal-form/Category";
import Image from "./meal-form/Image";
import Ingredients from "./meal-form/Ingredients";
import Description from "./meal-form/Description";
import { useStore } from "@/store/Provider";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Price from "./meal-form/Price";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const AddMealForm = ({
  existingMeal,
  isMealUpdate = false,
  onUpdateSuccess,
  isUpcomingMeal = false,
  onUpcomingSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { axiosInstance } = useAxios();

  const { user } = useStore();

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      title: existingMeal?.title || "",
      category: existingMeal?.category || "",
      image: existingMeal?.image || "",
      ingredients: existingMeal?.ingredients || [],
      description: existingMeal?.description || "",
      price: existingMeal?.price?.toString() || "",
    },
  });

  async function onSubmit(values) {
    try {
      setIsLoading(true);

      const { title, category, image, ingredients, price, description } =
        values;

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", image);
      formData.append("ingredients", ingredients);
      formData.append("price", price);
      formData.append("description", description);

      if (isMealUpdate) {
        if (image === existingMeal?.image) {
          formData.delete("image");
        } else {
          formData.append("image_id", existingMeal?.image_id || "");
        }

        const { data } = await axiosInstance({
          url: `meals/${existingMeal?._id}`,
          data: formData,
          method: "PATCH",
        });

        toast.success(data.message);
        onUpdateSuccess();
        return;
      }

      if (isUpcomingMeal) {
        const { data } = await axiosInstance({
          url: `meals/upcoming/meal`,
          method: "POST",
          data: formData,
        });

        toast.success(data.message);
        onUpcomingSuccess();

        return;
      }

      const { data } = await axiosInstance({
        url: "meals",
        data: formData,
        method: "POST",
      });

      toast.success(data?.message);
      queryClient.invalidateQueries();

      form.reset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Title form={form} />
        <Category form={form} />
        <Image form={form} />
        <Ingredients form={form} />
        <Description form={form} />
        <Price form={form} />
        <div className="grid gap-2">
          <Label>Distributor Name</Label>
          <Input disabled value={user?.fullName} />
        </div>
        <div className="grid gap-2">
          <Label>Distributor Email</Label>
          <Input disabled value={user?.email} />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader className="animate-spin" />} Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddMealForm;
