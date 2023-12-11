import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "~/actions/auth";
import { useAppDispatch, useAppSelector } from "~/hook";

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector((state) => state.auth!);

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormValues>();

    const onSubmit: SubmitHandler<LoginFormValues> = () => {
        dispatch(login(email, password))
            .then(() => {
                navigate("/");
                window.location.reload();
            })
            .catch(() => {
                console.error("Failed to login");
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="w-full bg-background min-h-screen justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        className="placeholder:text-primary text-primary"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        className="placeholder:text-primary text-primary"
                        value={password}
                        onChange={onChangePassword}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
