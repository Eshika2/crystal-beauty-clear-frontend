import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/all").then(
                (response) => {
                    // console.log(response.data.products);
                    setProducts(response.data.products);
                }
            )
        }, []
    )

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
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            (product, index)=>{
                                // console.log("Mapping" + product.productID);

                                return (
                                    <tr key={index} className="border-b-2 border-gray-200 text-center cursor-pointer hover:bg-gray-700 hover:text-white">
                                        <td className="p-2">{product.productId}</td>
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">{product.price}</td>
                                        <td className="p-2">{product.labeledPrice}</td>
                                        <td className="p-2">{product.stock}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}