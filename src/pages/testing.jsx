import { useState } from "react";

export default function Testing() {
    const [number, setNumber] = useState(0);
    const [status, setStatus] = useState("Pending");

    function increment() {
        let newValue = number + 1;
        setNumber(newValue);
    }

    function decrement() {
        let newValue = number - 1;
        setNumber(newValue);
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-linear-to-r from-white to-purple-500">
            <span className="text-3xl font-bold">{number}</span>

            <div className="w-full flex justify-center">
                <button className="w-[60px] bg-blue-500 text-white p-2 rounded-lg mr-[5px]" onClick={increment}>+</button>
                <button className="w-[60px] bg-blue-500 text-white p-2 rounded-lg ml-[5px]" onClick={decrement}>-</button>
            </div>

            <span className="text-3xl font-bold">{status}</span>

            <div className="w-full flex justify-center">
                <button className="w-[60px] bg-blue-500 text-white p-2 rounded-lg mr-[5px]" 
                    onClick={()=>{
                        setStatus("Passed");
                    }}>
                    Pass
                </button>
                <button className="w-[60px] bg-blue-500 text-white p-2 rounded-lg ml-[5px]" 
                    onClick={()=>{
                        setStatus("Failed");
                    }}>
                    Fail
                </button>
            </div>
        </div>
    );
}