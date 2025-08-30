import React, { useEffect, useState } from "react";
import type { QueryKey } from "@tanstack/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "./Header";
import Tabler from "./Tabler";
import { getProducts, deleteProduct, updateProduct } from "@/helper/api/apis";
import { Product } from "@/types/types";
import { Loader, AlertTriangle, MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/products";

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
    title: "random",
    price: 0,
    stock: 0,
    category: "random",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(limit, (page - 1) * limit),
    // refetchInterval: 1000,
  });

  useEffect(() => {
    if (data?.products) setProducts(data.products);
  }, [data, setProducts]);

  // Optimistic delete
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["products", page]);
      const previousData = queryClient.getQueryData(["products", page]);
      queryClient.setQueryData(["products", page], (oldData: any) => ({
        ...oldData,
        products: oldData.products.filter((p: Product) => p.id !== id),
      }));
      return { previousData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["products", page], context?.previousData);
    },
  });

  // Optimistic edit
// Optimistic edit
const editMutation = useMutation({
  mutationFn: (product: Product) => updateProduct(product.id, product),
  onMutate: async (product) => {
    await queryClient.cancelQueries(["products", page] as QueryKey);
    const previousData = queryClient.getQueryData(["products", page]);

    // Optimistic update
    queryClient.setQueryData(["products", page], (oldData: any) => ({
      ...oldData,
      products: oldData.products.map((p: Product) =>
        p.id === product.id ? { ...p, ...product } : p
      ),
    }));

    return { previousData };
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

  // ====== ADD DIALOG ======
  const openAddDialog = () => {
    setEditData({ title: "", price: 0, stock: 0, category: "" });
    setAddDialogOpen(true);
  };

  const saveNewProduct = () => {
    const newProduct: Product = { id:Math.ceil(Math.random() * 1000), ...editData };
    setProducts([newProduct, ...products]);
    setAddDialogOpen(false);
  };
  // =======================

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
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || selectedCategory === "All Categories"
        ? true
        : product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full px-2 pt-2">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onAddProduct={openAddDialog}
      />

      {/* Pagination info & controls */}
      <div className="flex items-center justify-between mt-4 px-4 py-2 bg-gray-50 rounded-md shadow-sm">
        <div className="hidden text-sm">
          <span>Showing</span>{" "}
          <span className="font-medium ">
            {(page - 1) * limit + 1}–{Math.min(page * limit, data?.total || 0)}
          </span>{" "}
          of <span className="font-medium">{data?.total || 0}</span> products
        </div>
        <div className="text-sm whitespace-nowrap">
          <span>Page</span>{" "}
          <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">
            {Math.ceil((data?.total || 0) / limit)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            variant="outline"
            className="shadow-sm text-sm font-medium"
          >
            <span className="hidden sm:block">Previous</span>{" "}
            <MoveLeft className="block sm:hidden" />
          </Button>

          <Button
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, Math.ceil((data?.total || 0) / limit))
              )
            }
            disabled={page === Math.ceil((data?.total || 0) / limit)}
            variant="outline"
            className="shadow-sm text-sm font-medium"
          >
            <span className="hidden sm:block">Next</span>{" "}
            <MoveRight className="block sm:hidden" />
          </Button>
        </div>
      </div>

      <Tabler
        filteredProducts={filteredProducts}
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

      {/* ADD PRODUCT MODAL */}
      {addDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>

            <input required
              type="text"
              placeholder="Title"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value||"random" })
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: Number(e.target.value) })
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={editData.stock}
              onChange={(e) =>
                setEditData({ ...editData, stock: Number(e.target.value) })
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <input required
              type="text"
              placeholder="Category"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              className="border p-2 w-full mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setAddDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={saveNewProduct}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
