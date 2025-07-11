import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Category = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      name="category"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className={`w-full !h-10 cursor-pointer ${
                  fieldState.error && "ring-destructive/20  border-destructive"
                }`}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="border-border">
                <SelectItem value="Snacks">Snacks</SelectItem>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Category;
