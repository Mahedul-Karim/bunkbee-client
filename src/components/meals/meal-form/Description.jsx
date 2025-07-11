import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';

const Description = ({form}) => {
  return (
     <FormField
          control={form?.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the meal" className="h-30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

export default Description