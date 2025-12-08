import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login Successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success("Google Login Successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">
                <p className="text-2xl font-bold text-center mb-8 text-green-700">Welcome back</p>

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                        required
                    />

                    <p className="text-right text-gray-500 text-sm cursor-pointer hover:text-black">
                        Forgot Password?
                    </p>

                    <button
                        type="submit"
                        className="bg-teal-600 text-white rounded-full py-2 shadow hover:bg-teal-700 transition"
                    >
                        Log in
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-teal-600 font-bold underline">
                        Sign up
                    </Link>
                </p>

                <div className="flex flex-col gap-4 mt-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-400 py-2 shadow"
                    >
                        <FcGoogle size={20} />
                        <span>Log in with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;