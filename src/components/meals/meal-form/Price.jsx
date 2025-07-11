import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Price = ({form}) => {
  return (
    <FormField
          control={form?.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type={'text'} placeholder="Your meal price" className="h-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

export default Price