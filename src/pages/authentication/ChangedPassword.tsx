/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetMeUserQuery, usePasswordChangedUserMutation } from "@/redux/features/user/userApi";
import LoadingProgress from "@/pages/shared/LoadingProgress";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the form schema
const formSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(1, "New password is required"),
});

const ChangedPassword = () => {
    const [passwordChanged, { isLoading: isChangingPassword }] = usePasswordChangedUserMutation();
    const { data: userData, isLoading: isUserLoading, isError: isUserError } = useGetMeUserQuery(undefined);
    const user = userData?.data;
    console.log(user);

    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
    });

    console.log(userData);
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!user?.email) {
            toast.error("User email not found. Please try again.");
            return;
        }

        try {
            await passwordChanged({ userEmail: user.email, body: data }).unwrap();
            toast.success("Password changed successfully!");
            reset();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to change password. Please try again.");
        }
    };

    if (isUserLoading) {
        return <div><LoadingProgress /></div>;
    }

    if (isUserError) {
        return <div>Error fetching user data. Please try again later.</div>;
    }

    return (
        <div>
            <div className="justify-center items-center flex mt-10 lg:ml-24 md:ml-12">
                <Card className="w-[350px]">
                    <CardHeader className="flex justify-center items-center text-2xl">
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <Input
                                        {...register("oldPassword")}
                                        type="password"
                                        id="oldPassword"
                                        placeholder="Enter your old password"
                                    />
                                    {errors.oldPassword && (
                                        <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
                                    )}

                                    <label htmlFor="newPassword">New Password</label>
                                    <Input
                                        {...register("newPassword")}
                                        type="password"
                                        id="newPassword"
                                        placeholder="Enter your new password"
                                    />
                                    {errors.newPassword && (
                                        <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded w-full"
                                    disabled={isChangingPassword || isUserLoading}
                                >
                                    {isChangingPassword ? "Processing..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ChangedPassword;