import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";


export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(
        () => {
            if (!loaded) {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/all").then(
                    (response) => {
                        // console.log(response.data.products);
                        setProducts(response.data.products);
                        setLoaded(true);
                    }
                )
            }
        }, [loaded]
    )

    async function deleteProduct(id) {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You are not logged in");
            return;
        }

        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            
            setLoaded(false);
            toast.success("Product deleted successfully");

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="w-full h-full rounded-lg relative">
            <Link to="/admin/addProduct" className="text-white text-3xl 
                               bg-gray-700 
                               absolute right-5 bottom-5 
                               p-[12px] 
                               rounded-full 
                               cursor-pointer 
                               hover:bg-gray-300 
                               hover:text-gray-700"

            >
                <FaPlus />
            </Link>
            { loaded && 
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-2">Product ID</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Labeled Price</th>
                            <th className="p-2">Stock</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(
                                (product, index)=>{
                                    // console.log("Mapping" + product.productID);

                                    return (
                                        <tr key={index} className="border-b-2 border-gray-200 text-center cursor-pointer hover:bg-gray-300">
                                            <td className="p-2">{product.productId}</td>
                                            <td className="p-2">{product.name}</td>
                                            <td className="p-2">{product.price}</td>
                                            <td className="p-2">{product.labeledPrice}</td>
                                            <td className="p-2">{product.stock}</td>
                                            <td className="p-2">
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FaRegTrashAlt onClick={() => {
                                                        deleteProduct(product.productId);
                                                    }}
                                                    className="text-[25px] m-[10px] hover:text-red-500 "/>
                                                    <GrEdit className="text-[25px] m-[10px] hover:text-blue-500 "/>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            }
            { !loaded && 
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[60px] h-[60px] border-[4px] border-transparent border-t-blue-700 rounded-full animate-spin">
                    </div>
                </div>

            }
        </div>
    )
}