import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return toast.error("Passwords do not match!");
        if (!/[A-Z]/.test(password)) return toast.error("Password must include at least one uppercase letter!");
        if (!/[a-z]/.test(password)) return toast.error("Password must include at least one lowercase letter!");
        if (password.length < 6) return toast.error("Password must be at least 6 characters!");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return toast.error("Password must include at least one special character!");

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name, photoURL });
  
            await setDoc(doc(db, "users", result.user.uid), {
                name,
                email,
                photoURL,
                role: "Student"
            });
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleRegister = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">
                <p className="text-2xl font-bold text-center mb-8 text-green-700">Create Account</p>

                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Photo URL (optional)"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                        required
                    />


                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none w-full pr-10"
                            required
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </span>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none w-full pr-10"
                            required
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="bg-teal-600 text-white rounded-full py-2 shadow hover:bg-teal-700 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-teal-600 font-bold underline">
                        Log in
                    </Link>
                </p>

                <div className="flex flex-col gap-4 mt-6">
                    <button
                        onClick={handleGoogleRegister}
                        className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-400 py-2 shadow"
                    >
                        <FcGoogle size={20} />
                        <span>Sign up with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
