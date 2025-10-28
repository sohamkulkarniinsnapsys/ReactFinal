import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from '../store/authSlice';
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
           
            const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Login failed');

            const userData = result.user;
            if (userData) {
                dispatch(authLogin(userData));
                console.log("[Login.jsx] Dispatched login to Redux");
                navigate("/"); // <-- change "/" to "/dashboard" or posts page
            }
        } catch (error) {
            console.error(error); // log full error for debugging
            console.error("❌ [Login.jsx] Login error:", error);
            setError(error.message || "Login failed");
        }
    };

    return (
        <div className='flex items-center justify-center w-full min-h-screen bg-gray-50'>
            <div className='mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10 shadow-lg'>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be valid",
                                },
                            })}
                        />

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        <Button type="submit" className="w-full">Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
