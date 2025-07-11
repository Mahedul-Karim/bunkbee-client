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

const Status = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      name="status"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className={`w-full !h-10 cursor-pointer ${
                  fieldState.error && "ring-destructive/20  border-destructive"
                }`}
              >
                <SelectValue placeholder="Select meal status" />
              </SelectTrigger>
              <SelectContent className="border-border">
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Status;
