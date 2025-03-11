import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterUserMutation } from "@/redux/features/user/userApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // Fixed import
import { toast } from "sonner";

type Inputs = {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
};

const RegistrationAuth = () => {
    const [addUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const toastId = toast.loading("Creating account...");

        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            address: data.address,
            mobile: data.phone,
        };

        try {
            const res = await addUser(userData).unwrap(); // Use unwrap() to handle the response

            if (res.success) {
                toast.success("Account created successfully!", { id: toastId });

                // Navigate to the login page
                setTimeout(() => {
                    navigate("/login");
                }, 700);
            } else {
                toast.error(res.message || "Failed to create account", { id: toastId });
            }
        } catch (err) {
            console.error("Registration error:", err);
            toast.error("Something went wrong. Please try again.", { id: toastId });
        }
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <Card className="w-[350px]">
                <CardHeader className="flex justify-center items-center text-2xl">
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="name">User Name</label>
                                <Input
                                    type="text"
                                    id="name"
                                    {...register("name", { required: "Username is required" })}
                                    placeholder="Enter user name"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                                <label htmlFor="email">Email</label>
                                <Input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Please enter a valid email address",
                                        },
                                    })}
                                    type="email"
                                    id="email"
                                    placeholder="Enter user email"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                                <label htmlFor="password">Password</label>
                                <Input
                                    {...register("password", { required: "Password is required" })}
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                                {/* Address */}
                                <label htmlFor="address">Address</label>
                                <Textarea
                                    id="address"
                                    {...register("address", { required: "Address is required" })}
                                    placeholder="Enter user name"
                                />
                                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                                {/* Phone */}
                                <label htmlFor="mobile">Mobile Number</label>
                                <Input
                                    type="number"
                                    id="mobile"
                                    {...register("phone", { required: "mobile required" })}
                                    placeholder="Enter user name"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded w-full"
                                disabled={isLoading} // Disable button while loading
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </CardContent>
                <div className="flex justify-center p-2 mb-2">
                    <h2>
                        Already have an account? Go to{" "}
                        <Link to="/login" className="text-blue-600 font-semibold">
                            Log In
                        </Link>
                    </h2>
                </div>
                <CardFooter className="flex justify-end">
                    <Link to={"/"}>
                        <button>Back To Home</button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegistrationAuth;
