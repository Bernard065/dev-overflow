import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomFilterProps } from "@/types";

const Filter = ({
  placeholder,
  pageFilters,
  containerClasses,
}: CustomFilterProps) => {
  return (
    <Select>
      <SelectTrigger
        className={`background-light800_darkgradient   body-regular light-border text-dark500_light700 relative min-h-[56px]  flex-1 items-center gap-1 rounded-xl px-4 ${containerClasses}`}
      >
        <div className="line-clamp-1 flex text-left">
          <SelectValue placeholder={placeholder} className="" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {pageFilters.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
