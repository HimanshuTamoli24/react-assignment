import React from 'react'
import {
    Table as CustomTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Trash2, FilePenLine } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { repsonsiveTruncate } from "@/helper/trucate";
import { Product } from '@/types/types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface Props {
    filteredProducts: Product[];
    searchTerm: string;
    openEdit: (product: Product) => void;
    setDeleteId: (id: number | null) => void;
    deleteMutation: any;
    editProduct: Product | null;
    editData: { title: string; price: number; stock: number; category: string };
    setEditProduct: (product: Product | null) => void;
    editMutation: any;
    windowWidth: number;
    deleteId: any;
    setEditData: any
}

function Tabler({
    filteredProducts,
    searchTerm,
    openEdit,
    setDeleteId,
    deleteMutation,
    editProduct,
    editData,
    setEditProduct,
    editMutation,
    windowWidth,
    deleteId,
    setEditData

}: Props) {
    return (
        <div> <CustomTable className="shadow-sm  border mt-3 rounded-md">
            <TableHeader>
                <TableRow className="bg-gray-50">
                    <TableHead className="hidden sm:block" ></TableHead>
                    <TableHead className="">Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden sm:block">Category</TableHead>
                    <TableHead className="text-right ">Stock</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {filteredProducts.length ? (
                    filteredProducts.map((item: Product) => (
                        <TableRow key={item.id} className="hover:bg-gray-50 ">
                            <TableCell className="hidden sm:block">{item.id}.</TableCell>
                            <TableCell className={`${!searchTerm ? "" : "text-blue-600 "} `}>{repsonsiveTruncate({ text: item.title, windowWidth })}</TableCell>

                            <TableCell>${item.price.toFixed()}</TableCell>
                            <TableCell className="hidden sm:block">{repsonsiveTruncate({ text: item.category, windowWidth })}</TableCell>
                            <TableCell className="text-right">{item.stock}</TableCell>
                            <TableCell className="flex items-center justify-center gap-3">
                                <button
                                    className="p-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center"
                                    onClick={() => openEdit(item)}
                                    title="Edit"
                                >
                                    <FilePenLine className="w-4 h-4" />
                                </button>

                                <button
                                    className="p-1.5 rounded-xl  bg-red-100 hover:bg-red-200 text-red-800 flex items-center justify-center"
                                    onClick={() => setDeleteId(item.id)}
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-red-500">
                            No products found.
                        </TableCell>
                    </TableRow>
                )}

            </TableBody>
        </CustomTable>

            {/* Delete Dialog */}
            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this product?</p>
                    <DialogFooter className="mt-4 flex gap-2">
                        <Button variant="outline" onClick={() => setDeleteId(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (deleteId) {
                                    deleteMutation.mutate(deleteId);
                                    setDeleteId(null);
                                }
                            }}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? "Deleting…" : "Delete"}
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <Input
                            value={editData.title}
                            onChange={(e) =>
                                setEditData({ ...editData, title: e.target.value })
                            }
                            placeholder="Title"
                        />
                        <Input
                            type="number"
                            value={editData.price}
                            onChange={(e) =>
                                setEditData({ ...editData, price: +e.target.value })
                            }
                            placeholder="Price"
                        />
                        <Input
                            type="number"
                            value={editData.stock}
                            onChange={(e) =>
                                setEditData({ ...editData, stock: +e.target.value })
                            }
                            placeholder="Stock"
                        />
                        <Input
                            value={editData.category}
                            onChange={(e) =>
                                setEditData({ ...editData, category: e.target.value })
                            }
                            placeholder="Category"
                        />
                    </div>
                    <DialogFooter className="mt-4 flex gap-2">
                        <Button variant="outline" onClick={() => setEditProduct(null)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                if (editProduct) {
                                    editMutation.mutate({ ...editProduct, ...editData });
                                    setEditProduct(null);
                                }
                            }}
                            disabled={editMutation.isPending}
                        >
                            {editMutation.isPending ? "Saving…" : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog></div>
    )
}

export default Tabler