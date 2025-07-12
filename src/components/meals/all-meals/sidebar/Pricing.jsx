import React, { useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useSearchParams } from "react-router";

const Pricing = () => {
  const timeoutRef = useRef("");

  const [searchParams, setSearchParams] = useSearchParams();

  const price = searchParams.get("price") || "";

  const priceArray = price ? price?.split("-") : [];

  const minValue = priceArray?.length > 0 ? Number(priceArray?.at(0)) : 0;
  const maxValue = priceArray?.length > 0 ? Number(priceArray?.at(1)) : 1000;

  const [rangeValue, setRangeValue] = useState([minValue, maxValue]);

  return (
    <div>
      <h3 className="font-semibold text-dark mb-4">Pricing</h3>
      <Slider
        defaultValue={rangeValue}
        max={1000}
        step={10}
        onValueChange={(val) => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef);
          }

          timeoutRef.current = setTimeout(() => {
            searchParams.set("price", val?.join("-"));
            setSearchParams(searchParams);
          }, 600);

          setRangeValue(val);
        }}
      />
      <p className="mt-3 text-xs xs:text-sm text-dark flex items-center justify-center">
        <span className="text-xs xs:text-sm ml-2 text-dark">
          {"$" + rangeValue[0] + "-" + "$" + rangeValue[1]}
        </span>
      </p>
    </div>
  );
};

export default Pricing;
