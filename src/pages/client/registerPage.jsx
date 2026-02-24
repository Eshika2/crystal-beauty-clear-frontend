import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function handleRegister() {

        // 🔐 Client-side validation
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // if (password.length < 6) {
        //     toast.error("Password must be at least 6 characters");
        //     return;
        // }

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/register", {
            firstName,
            lastName,
            email,
            phone,
            password
        })
        .then((response) => {
            toast.success(response.data.message || "Registration successful");
            setLoading(false);
            navigate("/login");
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || "Registration failed");
            setLoading(false);
        });
    }

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">

            {/* Left Section */}
            <div className="w-[50%] h-full"></div>

            {/* Right Section */}
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-2xl flex flex-col justify-center items-center">

                    <h1 className="text-2xl font-semibold mb-4 text-gray-800">
                        Create Account
                    </h1>

                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="text"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        className="w-[400px] h-[50px] bg-green-500 rounded-xl text-white mt-3 hover:bg-green-600 transition"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                    <p className="text-stone-600 mt-3">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-green-500 hover:text-green-600"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}