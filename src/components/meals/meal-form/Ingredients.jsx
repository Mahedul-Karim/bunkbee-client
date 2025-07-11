import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Ingredients = ({ form }) => {
  const [ingredient, setIngredient] = useState("");

  const ingredients = form?.watch("ingredients");


  return (
    <FormField
      control={form?.control}
      name="ingredients"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Ingredients</FormLabel>
          <FormControl>
            <div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter an ingredient"
                  className={`h-10 ${
                    fieldState?.error && "border-destructive"
                  }`}
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                />
                <Button
                  size="icon"
                  type="button"
                  onClick={() => {
                    const existingValue = [...field.value];

                    existingValue.push(ingredient);

                    field.onChange(existingValue);
                    setIngredient("");
                  }}
                >
                  <Plus />
                </Button>
              </div>
              <div className="flex items-center gap-2 flex-wrap mt-4">
                {ingredients?.length > 0 &&
                  ingredients?.map((ing, i) => (
                    <Badge
                      key={i}
                      className="rounded-full bg-indigo-200 text-indigo-700"
                    >
                      {ing}
                      <button
                        className="cursor-pointer"
                        type="button"
                        onClick={() => {
                          const values = [...field.value];

                          const newValue = values.filter((val) => val !== ing);

                          field.onChange(newValue);
                        }}
                      >
                        <X className="size-4" />
                      </button>
                    </Badge>
                  ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Ingredients;
