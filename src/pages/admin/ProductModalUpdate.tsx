
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BikeBrand, BikeType } from "@/pages/types/index";
import { z } from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useUpdateProductMutation } from "@/redux/features/bikeProduct/bikeProductApi";
import LoadingProgress from "@/pages/shared/LoadingProgress";

// Zod schema for product validation
const productSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    brand: z.nativeEnum(BikeBrand).optional(),
    price: z.number().min(1, "Price must be at least 1").optional(),
    model: z.string().min(1, "Model is required").optional(),
    type: z.nativeEnum(BikeType).optional(),
    stock: z.number().min(1, "Quantity must be at least 1").optional(),
    bikeImage: z.string().url("Invalid URL").optional(),
});

interface TTitle {
    title: string;
    product: any;

}

const ProductModalUpdate = ({ title, product }: TTitle) => {
    const [updateProduct] = useUpdateProductMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
        resolver: zodResolver(productSchema),
        mode: "onBlur",
    });

    // Watch selected brand and type
    const selectedBrand = watch("brand");
    const selectedType = watch("type");

    // Pre-fill the form with product data when the modal opens
    useEffect(() => {
        if (isDialogOpen && product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("brand", product.brand);
            setValue("price", product.price);
            setValue("model", product.model);
            setValue("type", product.type);
            setValue("stock", product.stock);
            setValue("bikeImage", product.bikeImage);
        }
    }, [isDialogOpen, product, setValue]);

    // console.log(product);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading(<LoadingProgress />);

        try {
            if (!product?._id) {
                toast.error("Invalid product ID", { id: toastId });
                return;
            }

            const productData = {
                ...data,
                price: Number(data.price),
                quantity: Number(data.quantity),
            };

            // Correct way to call the mutation:
            // const res = await updateProduct({ bikeId: product._id, body: productData }).unwrap();
            const res = await updateProduct({id:product._id, updateData:productData});

            if (res.error) {
                // toast.error(res.error.data.message, { id: toastId });
                throw new Error((res.error as any).data.message as string)
                
            } else {
                toast.success("Product updated successfully", { id: toastId });
                reset();
                setIsDialogOpen(false);
            }
        } catch (err:any) {
            toast.error(err.message || "Something went wrong", { id: toastId });
        }
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">{title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl xl:max-w-3xl p-4 overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Update Bicycle Product</DialogTitle>
                    </DialogHeader>

                    <div className="lg:ml-0 md:ml-0 justify-center flex">
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[500px]">
                            {/* Input Name */}
                            <div className="p-1">
                                <Label>Product Name</Label>
                                <Input
                                    type="text"
                                    className="w-full"
                                    placeholder="Input product name"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <Label className="text-red-700 text-sm">
                                        {errors.name.message?.toString()}
                                    </Label>
                                )}
                            </div>

                            {/* Description */}
                            <div className="p-1">
                                <Label>Description</Label>
                                <Textarea
                                    placeholder="Input product description"
                                    className="w-full"
                                    {...register("description")}
                                />
                                {errors.description && (
                                    <Label className="text-red-700 text-sm">
                                        {errors.description.message?.toString()}
                                    </Label>
                                )}
                            </div>

                            {/* Select Bicycle Brand */}
                            <div className="p-1 mt-2">
                                <Label className="p-1">Brand</Label>
                                <Select
                                    onValueChange={(value: BikeBrand) => setValue("brand", value)}
                                    value={selectedBrand}
                                    required
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select Brand</SelectLabel>
                                            {Object.values(BikeBrand).map((brand) => (
                                                <SelectItem key={brand} value={brand}>
                                                    {brand}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Input Product Price */}
                            <div className="p-1">
                                <Label>Product Price</Label>
                                <Input
                                    type="number"
                                    className="w-full"
                                    placeholder="Input product price"
                                    {...register("price", { valueAsNumber: true })}
                                />
                                {errors.price && (
                                    <Label className="text-red-700 text-sm">
                                        {errors.price.message?.toString()}
                                    </Label>
                                )}
                            </div>

                            {/* Input Product Model */}
                            <div className="p-1">
                                <Label>Product Model</Label>
                                <Input
                                    type="text"
                                    className="w-full"
                                    placeholder="Input product model"
                                    {...register("model")}
                                />
                                {errors.model && (
                                    <Label className="text-red-700 text-sm">
                                        {errors.model.message?.toString()}
                                    </Label>
                                )}
                            </div>

                            {/* Select Product Type */}
                            <div className="p-1 mt-2">
                                <Label className="p-1">Product Type</Label>
                                <Select
                                    onValueChange={(value: BikeType) => setValue("type", value)}
                                    value={selectedType}
                                    required
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select Type</SelectLabel>
                                            {Object.values(BikeType).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Input Product Quantity */}
                            <div className="p-1">
                                <Label>Product Quantity</Label>
                                <Input
                                    type="number"
                                    className="w-full"
                                    placeholder="Input product quantity"
                                    {...register("stock", { valueAsNumber: true })}
                                />
                                {errors.stock && (
                                    <Label className="text-red-700 text-sm">
                                        {errors.stock.message?.toString()}
                                    </Label>
                                )}
                            </div>

                            {/* Input Product Image Link */}
                            <div className="p-1">
                                <Label>Product Image Link</Label>
                                <Input
                                    type="text"
                                    className="w-full"
                                    placeholder="Input product image link"
                                    {...register("bikeImage")}
                                />
                                {errors.bikeImage && (
                                    <Label className="text-red-700 text-sm">
                                        {errors.bikeImage.message?.toString()}
                                    </Label>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="p-1 mt-2">
                                <Button className="w-full" type="submit">
                                    Update Product
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductModalUpdate;