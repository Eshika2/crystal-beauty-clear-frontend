import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import MediaUpload from "../../utils/mediaUpload";

export default function EditProductForm() {

    const locationData = useLocation();
    const navigate = useNavigate();

    // console.log(locationData);

    if (locationData.state == null) {
        toast.error("Please select a product to edit");
        navigate("/admin/products");
        return;
    }

    const [productId, setProductId] = useState(locationData.state.productId);
    const [name, setName] = useState(locationData.state.name);
    const [altNames, setAltNames] = useState(locationData.state.altNames.join(","));
    const [price, setPrice] = useState(locationData.state.price);
    const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    const [images, setImages] = useState([]);


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
            let result = await Promise.all(promisesArray);
            // console.log(result);

            if (result.length === 0) {
                result = locationData.state.images;
            }

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

            await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, product, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            toast.success("Product Updated Successfully");
            navigate("/admin/products");
            
        } catch (error) {
            console.log(error);
            toast.error("Failed to Update Product");
        }
    }

    return (
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-xl flex flex-col items-center">
                <h1 className="text-3xl font-bold m-[10px]">Edit Product</h1>
                <input
                    disabled
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
                    }}
                />
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