import React from "react";
import { useSearchParams } from "react-router";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CATEGORY = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Breakfast",
    value: "breakfast",
  },
  {
    label: "Snacks",
    value: "snacks",
  },
  {
    label: "Lunch",
    value: "lunch",
  },
  {
    label: "Dinner",
    value: "dinner",
  },
];

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";

  const handleValueChange = (val) => {
    searchParams.set("category", val);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <h3 className="font-semibold text-dark mb-2">Category</h3>
      <RadioGroup defaultValue={category} onValueChange={handleValueChange}>
        {CATEGORY?.map((cat, i) => (
          <div className="flex items-center space-x-2" key={i}>
            <RadioGroupItem value={cat.value} id={cat.value} />
            <Label htmlFor={cat.value} className="font-normal cursor-pointer">
              {cat.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Category;
