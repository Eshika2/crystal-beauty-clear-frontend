import { Link } from "react-router-dom";

export default function AddProductForm() {
    return (
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-xl flex flex-col items-center">
                <h1 className="text-3xl font-bold m-[10px]">Add Product</h1>
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Product ID" 
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Product Name" 
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Alternative Names" 
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Price" 
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Labelled Price" 
                />
                <textarea
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Description" 
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Stock" 
                />
                <div className="w-[400px] h-[100px] flex justify-between items-center">
                    <Link 
                        to="/admin/products" 
                        className="w-[180px] text-white text-center text-xl bg-red-500 p-[10px] rounded-xl cursor-pointer hover:bg-red-600"
                    >
                        Cancel
                    </Link>
                    <botton
                        className="w-[180px] text-white text-center text-xl bg-green-500 p-[10px] rounded-xl cursor-pointer hover:bg-green-600"
                    >
                        Save
                    </botton>
                </div>
            </div>
        </div>
    )
}