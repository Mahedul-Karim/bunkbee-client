import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddMealForm from "@/components/meals/AddMealForm";

const AddMeal = () => {
  return (
    <Card className={'max-w-2xl mx-auto border-border shadow-none'}>
      <CardHeader>
        <CardTitle className="text-2xl">Add New Meal</CardTitle>
        <CardDescription>Fill in the details to add a new meal to the menu</CardDescription>
      </CardHeader>
      <CardContent>
        <AddMealForm />
      </CardContent>
    </Card>
  );
};

export default AddMeal;
