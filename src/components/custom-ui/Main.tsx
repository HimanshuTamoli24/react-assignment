import React, { useEffect, useState } from "react";

import Header from "./Header";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, updateProduct } from "@/helper/api/apis";
import { Product } from "@/types/types";
import { Loader, AlertTriangle, MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useProductStore } from "@/store/products";
import Tabler from "./Tabler";
import { GradientRoundedAreaChart } from "./Chart";


export default function Table() {
  const queryClient = useQueryClient();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [editData, setEditData] = useState({
    title: "",
    price: 0,
    stock: 0,
    category: "",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(limit, (page - 1) * limit),
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data, setProducts]);
  // console.log("products", products);

  // Optimistic delete
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["products"]);
      const previousData = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (oldData: any) => ({
        ...oldData,
        products: oldData.products.filter((p: Product) => p.id !== id),
      }));
      return { previousData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["products"], context?.previousData);
    },
  });

  // Optimistic edit for multiple fields
  const editMutation = useMutation({
    mutationFn: (product: Product) => updateProduct(product.id, product),
    onMutate: async (product) => {
      await queryClient.cancelQueries(["products"]);
      const previousData = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (oldData: any) => ({
        ...oldData,
        products: oldData.products.map((p: Product) =>
          p.id === product.id ? { ...p, ...product } : p
        ),
      }));
      return { previousData };
    },
    onError: (err, product, context) => {
      queryClient.setQueryData(["products"], context?.previousData);
    },
  });

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setEditData({
      title: product.title,
      price: product.price,
      stock: product.stock,
      category: product.category,
    });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin w-6 h-6 text-gray-600" />
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600 space-y-2">
        <AlertTriangle className="w-6 h-6" />
        <p>{error instanceof Error ? error.message : "Something went wrong"}</p>
      </div>
    );

  if (!data?.products?.length)
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No products found.
      </div>
    );
  

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || selectedCategory === "All Categories"
        ? true
        : product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

 

  return (
    <div className="w-full px-4 py-6">


      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onAddProduct={() => setAddDialogOpen(true)}
      />


      <div className="flex items-center justify-between mt-4 px-4 py-2 bg-gray-50 rounded-md shadow-sm">
        {/* Page info */}
        <div className="hidden text-sm">
          <span>Showing</span>{" "}
          <span className="font-medium ">
            {(page - 1) * limit + 1}–
            {Math.min(page * limit, data?.total || 0)}
          </span>{" "}
          of <span className="font-medium">{data?.total || 0}</span> products
        </div>

        {/* Page info */}
        <div className="text-sm whitespace-nowrap">
          <span>Page</span>{" "}
          <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">{Math.ceil((data?.total || 0) / limit)}</span>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            variant="outline"
            className=" shadow-sm text-sm font-medium"
          >
            <span className="hidden sm:block">Previous</span> <MoveLeft className="  block sm:hidden" />
          </Button>

          <Button
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, Math.ceil((data?.total || 0) / limit))
              )
            }
            disabled={page === Math.ceil((data?.total || 0) / limit)}
            variant="outline"
            className=" shadow-sm text-sm font-medium"
          >
            <span className="hidden sm:block"> Next</span> <MoveRight className="  block sm:hidden" />

          </Button>
        </div>
      </div>
      <Tabler filteredProducts={filteredProducts}
        searchTerm={searchTerm}
        openEdit={openEdit}
        setDeleteId={setDeleteId}
        deleteMutation={deleteMutation}
        editProduct={editProduct}
        editData={editData}
        setEditProduct={setEditProduct}
        editMutation={editMutation}
        windowWidth={windowWidth}
        deleteId={deleteId}
        setEditData={setEditData}
        
         />



    </div>
  );
}
