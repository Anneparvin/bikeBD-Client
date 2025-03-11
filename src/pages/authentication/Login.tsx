

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
import { setUser, TUser } from "../../redux/features/auth/AuthSlice";
import { useLoginUserMutation } from "@/redux/features/user/userApi";
import { verifyToken } from "@/utils/verifyToken";

// Define the form schema using zod
const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});



const LoginAuth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const from = location.state?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // defaultValues: {
        //     email: "",
        //     password: "",
        // },
    });

    // Use the login mutation
    const [login, { isLoading, isSuccess, data, isError, error }] = useLoginUserMutation();

    // Handle form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await login(values);
    };

    // Handle API response and errors
    const toastId = "login";
    useEffect(() => {
        if (isLoading) {
            toast.loading("Processing ...", { id: toastId });
        }

        if (isSuccess && data?.data) {

            // Ensure the token is a valid string
            const token = data.data?.token || data.data;


             if (typeof token !== "string" || !token)
            {
                toast.error("Invalid token received from the server.", { id: toastId });
                return;
            }

            try {
                const user = verifyToken(token) as TUser;
                 console.log(user);

                  // Store token and user information in localStorage
        localStorage.setItem("accessToken", token.trim());  
        localStorage.setItem("user", JSON.stringify(user)); 

        console.log(localStorage.getItem("accessToken"));  
        console.log(localStorage.getItem("user")); 


                dispatch(setUser({ user, token }));
                toast.success(data?.message, { id: toastId });

                setTimeout(() => {
                    navigate(from, { state: location.state?.state, replace: true });
                }, 1000);
            } catch (decodeError) {
                console.error("Token decoding failed:", decodeError);
                toast.error("Failed to decode token. Please try again.", { id: toastId });
            }
        }

        if (isError && error) {
            // Log the error for debugging
            console.error("Login error:", error);

            // Display a user-friendly error message
            toast.error("Login failed. Please check your credentials.", { id: toastId });
        }
    }, [data, dispatch, error, from, isError, isLoading, isSuccess, location.state?.state, navigate]);

    return (
        <div className="justify-center items-center flex mt-10">
            <Card className="w-[350px]">
                <CardHeader className="flex justify-center items-center text-2xl">
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="email">Email</label>
                                <Input
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    placeholder="Enter user email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}

                                <label htmlFor="password">Password</label>
                                <Input
                                    {...register("password")}
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded w-full"
                                disabled={isLoading} 
                            >
                                {isLoading ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </CardContent>
                <div className="flex justify-center p-2 mb-2">
                    <h2>
                        I have no Account. Go to{" "}
                        <Link to="/register" className="text-blue-600 font-semibold">
                            Register
                        </Link>
                    </h2>
                </div>
                <CardFooter className="flex justify-end">
                    <Link to={"/"}>
                        
                        <button>Back to home</button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginAuth;

