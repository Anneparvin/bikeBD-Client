
import { useState } from "react";
import { useGetMeUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { FaPhone } from "react-icons/fa6";
import { SiStatuspage } from "react-icons/si";
import { FaCriticalRole } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import LoadingProgress from "@/pages/shared/LoadingProgress";
import { TExtraError } from "@/pages/types";

// Define the schema for validation
const userSchema = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    mobile: z.string().optional(),
});

const ProfileManage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(userSchema),
        mode: "onBlur",
    });

    // Use the `refetch` function from `useGetMeUserQuery`
    const { data: userData, isLoading, isError, refetch } = useGetMeUserQuery(undefined);
    const user = userData?.data;

    const [updateUser] = useUpdateUserMutation();

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        try {
            // await updateUser({ userId: user._id, body: data }).unwrap();
            await updateUser(user._id);
            toast.success('User updated successfully');

            // Reset the form fields
            reset();

            // Close the modal
            setIsDialogOpen(false);

            // Refetch user data after a successful update
            refetch();
        } catch (error) {
            toast.error((error as TExtraError)?.data?.message || 'Failed to delete user');
        }
    };

    if (isLoading) {
        return <div><LoadingProgress /></div>;
    }

    if (isError) {
        return <div>Error fetching user data</div>;
    }

    return (
        <div className="lg:ml-24 md:ml-12">
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img
                    className="object-cover object-center w-full h-56"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    alt="avatar"
                />

                <div className="px-6 py-4">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{user?.name}</h1>

                    <p className="py-2 text-gray-700 dark:text-gray-400">
                        Full Stack maker & UI / UX Designer, love hip hop music Author of Building UI.
                    </p>

                    {/* Address */}
                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg
                            aria-label="location pin icon"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                            />
                        </svg>

                        <h1 className="px-2 text-sm">{user?.address}</h1>
                    </div>

                    {/* Email */}
                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg
                            aria-label="email icon"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                            />
                        </svg>

                        <h1 className="px-2 text-sm">{user?.email}</h1>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
                        <span><FaPhone /></span>
                        <h2>{user.imageUrl}</h2>
                    </div>

                    {/* Status */}
                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
                        <span><SiStatuspage /></span>
                        <h2>{user.status}</h2>
                    </div>

                    {/* Role */}
                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
                        <span><FaCriticalRole /></span>
                        <h2>{user.role}</h2>
                    </div>

                    <div className="flex justify-center mx-auto mt-4">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid gap-4 py-4">
                                        {/* Name */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input id="name" type="text" {...register("name")} defaultValue={user?.name} className="col-span-3" />
                                        </div>

                                        {/* Phone */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="mobile" className="text-right">
                                                Phone
                                            </Label>
                                            <Input type="number" id="mobile" defaultValue={user?.mobile} {...register("mobile")} className="col-span-3" />
                                        </div>

                                        {/* Address */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="address" className="text-right">
                                                Address
                                            </Label>
                                            <Textarea defaultValue={user?.address} {...register("address")} className="col-span-3" placeholder="Type your address here." />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileManage;