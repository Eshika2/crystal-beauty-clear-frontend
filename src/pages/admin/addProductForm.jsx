import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import MediaUpload from "../../utils/mediaUpload";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    async function handleSubmit() {
        const altNamesInArray = altNames.split(",");
        // console.log(altNamesInArray);

        const promisesArray = [];
        for (let i = 0; i < images.length; i++) {
            // console.log(images[i]);

            const promise = MediaUpload(images[i])
            promisesArray[i] = promise;

            // console.log(promisesArray[i]);
        }

        try {
            const result = await Promise.all(promisesArray);
            // console.log(result);

            const product = {
                productId: productId,
                name: name,
                altNames: altNamesInArray,
                price: price,
                labeledPrice: labeledPrice,
                description: description,
                stock: stock,
                images: result
            };
            // console.log(product);

            const token = localStorage.getItem("token");
            // console.log(token);

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product/create", product, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            toast.success("Product Added Successfully");
            navigate("/admin/products");
            
        } catch (error) {
            console.log(error);
            toast.error("Failed to Add Product");
        }
    }

    return (
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-xl flex flex-col items-center">
                <h1 className="text-3xl font-bold m-[10px]">Add Product</h1>
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Product ID" 
                    value={productId}
                    onChange={(e)=>{
                        setProductId(e.target.value);
                    }}
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Product Name" 
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Alternative Names" 
                    value={altNames}
                    onChange={(e)=>{
                        setAltNames(e.target.value);
                    }}
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Price"
                    value={price}
                    onChange={(e)=>{
                        setPrice(e.target.value);
                    }} 
                />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Labelled Price" 
                    value={labeledPrice}
                    onChange={(e)=>{
                        setLabeledPrice(e.target.value);
                    }}
                />
                <textarea
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Description" 
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value);
                    }}
                />
                <input 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="file"
                    multiple
                    onChange={(e)=>{
                        setImages(e.target.files);
                    }
                } />
                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    type="text" 
                    placeholder="Stock" 
                    value={stock}
                    onChange={(e)=>{
                        setStock(e.target.value);
                    }}
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
                        onClick={handleSubmit}
                    >
                        Save
                    </botton>
                </div>
            </div>
        </div>
    )
}