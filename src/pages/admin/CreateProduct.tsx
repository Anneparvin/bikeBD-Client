

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProductMutation } from "@/redux/features/bikeProduct/bikeProductApi";
import { TResponse } from "@/pages/types/index";
import {BikeBrand, BikeType}  from "../../pages/types/index";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for validation
 const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    brand: z.nativeEnum(BikeBrand),
    price: z.number().min(1, "Price must be at least 1"),
    model: z.string().min(1, "Model is required"),
    type: z.nativeEnum(BikeType),
    stock: z.number().min(1, "Quantity must be at least 1"),
    bikeImage: z.string().url("Invalid URL"),
});

const CreatProduct = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
        mode: "onBlur",
    });

    const [createProduct] = useCreateProductMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');

        try {
            // Convert price and quantity to numbers
            const productData = {
                ...data,
                price: Number(data.price),
                quantity: Number(data.quantity),
            };

            const res = (await createProduct(productData)) as TResponse<any>;
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success('Product created Successfully', { id: toastId });
            }
            reset()
        } catch (err) {
            toast.error('Something went wrong', { id: toastId });
        }
    };

    const selectedBrand = watch("brand");
    const selectedType = watch("type");

    return (
        <div className="lg:ml-48 md:ml-24">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Input Name */}
                <div className="p-1">
                    <Label>Product Name</Label>
                    <Input
                        type="text"
                        className="w-[500px]"
                        placeholder="Input Product name"
                        {...register("name")}
                    />
                    <div className="flex justify-end mt-1">
                        <Label className={errors.name ? "text-red-700 text-sm" : "hidden"}>
                            {errors.name?.message?.toString()}
                        </Label>
                    </div>
                </div>

                {/* Description */}
                <div className="p-1">
                    <Label>Description</Label>
                    <Textarea
                        placeholder="Input product description"
                        {...register("description")}
                    />
                    <div className="flex justify-end mt-1">
                        <Label className={errors.description ? "text-red-700 text-sm" : "hidden"}>
                            {errors.description?.message?.toString()}
                        </Label>
                    </div>
                </div>

                {/* Select Bicycle Brand */}
                <div className="p-1 mt-2">
                    <Label className="p-1">Brand</Label>
                    <Select
                        onValueChange={(value: BikeBrand) => setValue("brand", value)}
                        value={selectedBrand}
                        required
                    >
                        <SelectTrigger className="">
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
                        defaultValue={1}
                        className="w-[500px]"
                        placeholder="Input Product price"
                        {...register("price", {
                            valueAsNumber: true,
                        })}
                    />
                    <div className="flex justify-end mt-1">
                        <Label className={errors.price ? "text-red-700 text-sm" : "hidden"}>
                            {errors.price?.message?.toString()}
                        </Label>
                    </div>
                </div>

                {/* Input Product Model */}
                <div className="p-1">
                    <Label>Product Model</Label>
                    <Input
                        type="text"
                        className="w-[500px]"
                        placeholder="Input product model"
                        {...register("model")}
                    />
                    <div className="flex justify-end mt-1">
                        <Label className={errors.model ? "text-red-700 text-sm" : "hidden"}>
                            {errors.model?.message?.toString()}
                        </Label>
                    </div>
                </div>

                {/* Select Product Type */}
                <div className="p-1 mt-2">
                    <Label className="p-1">Product Type</Label>
                    <Select
                        onValueChange={(value: BikeType) => setValue("type", value)}
                        value={selectedType}
                        required
                    >
                        <SelectTrigger className="">
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
                        defaultValue={1}
                        className="w-[500px]"
                        placeholder="Input Product Quantity"
                        {...register("stock", {
                            valueAsNumber: true,
                        })}
                    />
                    <div className="flex justify-end mt-1">
                        <Label className={errors.stock ? "text-red-700 text-sm" : "hidden"}>
                            {errors.stock?.message?.toString()}
                        </Label>
                    </div>
                </div>

                {/* Input Product Image Link */}
                <div className="p-1">
                    <Label>Product Image Link</Label>
                    <Input
                        type="text"
                        className="w-[500px]"
                        placeholder="Input product image link"
                        {...register("bikeImage")}
                    />
                    <div className="flex justify-end mt-1">
                        <Label className={errors.bikeImage ? "text-red-700 text-sm" : "hidden"}>
                            {errors.bikeImage?.message?.toString()}
                        </Label>
                    </div>
                </div>

                {/* Submit */}
                <div className="p-1 mt-2">
                    <Button className="w-full" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreatProduct;