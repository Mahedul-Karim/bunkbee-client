import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon, Trash } from "lucide-react";

const Image = ({ form }) => {
  const image = form?.watch("image");

  return (
    <FormField
      control={form?.control}
      name="image"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Meal Image</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4 flex-wrap">
              <Label
                htmlFor="meal-image"
                className={`size-30 text-muted cursor-pointer flex flex-col items-center justify-center border  rounded-2xl border-dashed shrink-0 ${
                  fieldState.error ? "border-destructive" : "border-muted"
                }`}
              >
                <div className="shrink-0">
                  <ImageIcon className="size-7" />
                </div>
                <p>Click to select</p>
              </Label>
              <Input
                placeholder="Enter meal title"
                className="h-10 absolute hidden"
                id="meal-image"
                type={"file"}
                onChange={(e) => field.onChange(e.target.files[0])}
              />
              {image && (
                <div className="size-30 rounded-2xl shrink-0 relative">
                  <img
                    src={URL.createObjectURL(image)}
                    className="w-full h-full object-cover object-center rounded-2xl"
                  />
                  <div className="absolute top-1 right-1">
                    <Button
                      size="icon"
                      className={"bg-zinc-900 size-7 hover:bg-zinc-900"}
                      onClick={() => field.onChange("")}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Image;
