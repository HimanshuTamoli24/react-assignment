import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SelectScrollable from "./Option";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onAddProduct: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddProduct,
  onCategoryChange,
  selectedCategory,
}) => {
  return (
    <div className="flex  hidden flex-col sm:flex-row justify-between items-stretch sm:items-center mb-4 gap-4 p-4 shadow-sm border rounded-xl">
      
      {/* Left: Search + Select */}
      <div className="flex flex-col sm:flex-row flex-1 gap-2 w-full">
        <Input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search eg: books..."
          className="flex-1 w-full"
        />
        <SelectScrollable
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          className="w-full sm:w-72"
        />
      </div>

      {/* Right: Add button */}
      <Button
        onClick={onAddProduct}
        className="flex items-center justify-center gap-1 bg-black text-white hover:bg-gray-900 w-full sm:w-auto mt-2 sm:mt-0"
      >
        <Plus className="w-4 h-4" /> Add Product
      </Button>
    </div>
  );
};


export default Header;
