import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        // console.log(email);
        // console.log(password);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
            email: email,
            password: password
        })
        .then(
            (response)=>{
                console.log("Login Successfull", response.data);

                // alert("Login Successfull", response.data);
                toast.success(response.data.message || "Login Successfull");

                localStorage.setItem("token", response.data.token);

                const user = response.data.user;
                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        )
        .catch(
            (error)=>{
                console.log("Login Failed", error);

                // alert("Login Failed", error.response.data.message);
                toast.error(error.response.data.message || "Login Failed");
            }
        );
    }

    return (
        <div className="w-full bg-red-900 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-2xl flex flex-col justify-center items-center">
                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="email" 
                        placeholder="Email" 
                        onChange={
                            (e)=>{
                                setEmail(e.target.value)
                            }
                        }
                    />
                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Password" 
                        onChange={
                            (e)=>{
                                setPassword(e.target.value)
                            }
                        }
                    />
                    <button className="w-[400px] h-[50px] bg-green-500 rounded-xl text-white cursor-pointer"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}