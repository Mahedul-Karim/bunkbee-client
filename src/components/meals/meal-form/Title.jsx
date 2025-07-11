import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Title = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meal Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter meal title" className="h-10" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Title;
