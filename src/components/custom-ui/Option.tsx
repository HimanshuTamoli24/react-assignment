import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select";
import { useProductStore } from "@/store/products";
import React from "react";

interface SelectScrollableProps {
    className: string;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

function SelectScrollable({ selectedCategory, onCategoryChange,className }: SelectScrollableProps) {
    const products = useProductStore((state) => state.products);
    const categories = ["All Categories", ...Array.from(new Set(products.map(p => p.category)))];

    return (
       <div className={className}>
         <Select value={selectedCategory} onValueChange={onCategoryChange} >
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="All Categories" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
       </div>
    );
}

export default SelectScrollable;
