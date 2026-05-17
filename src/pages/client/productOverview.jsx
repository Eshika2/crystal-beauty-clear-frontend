import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";

export default function ProductOverview() {

    const params = useParams();
    // console.log(params.id);

    if (params.id == null) {
        window.location.href = "/products";
    }

    const [product, setProduct] = useState([]);
    const [status, setStatus] = useState("loading"); // loading, Loaded, error

    useEffect(
        () => {
            if (status === "loading") {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id).then(
                    (response) => {
                        console.log(response);
                        setProduct(response.data.product);
                        setStatus("Loaded");
                        console.log(product);
                    }
                ).catch(
                    () => {
                        toast.error("Product is not available");
                        setStatus("error");
                    }
                )
            }
        }, [status]
    )

    return (
        <div className="w-full h-full">
            {
                status == "Loading" && <Loader />
            }
            {
                status == "Loaded" && 
                    <div className="w-full h-full flex ">
                        <div className="w-[50%] h-full ">
                            <ImageSlider images={product.images} />
                        </div>

                        <div className="w-[50%] h-full p-[40px]">

                            <h1 className="text-3xl font-bold text-center mb-[40px]">{product.name}
                                {" | "}
                                <span className="text-2xl font-semibold text-gray-500 ">
                                    {product.altNames.join(" | ")}
                                </span>
                            </h1>


                            <div className="w-full flex justify-center mb-[40px]">
                                {
                                    product.labeledPrice > product.price ?
                                    <>
                                        <h2 className="text-2xl font-semibold text-center mr-5">{product.price.toFixed(2)}</h2>
                                        <h2 className="text-2xl font-semibold text-center line-through text-red-500">
                                            {product.labeledPrice.toFixed(2)}
                                        </h2>
                                    </>:
                                        <h2 className="text-2xl font-semibold text-center ">{product.price.toFixed(2)}</h2>
                                }
                            </div>
                             
                            <p className="text-xl text-center mb-[40px]">{product.description}</p>

                            <div className="w-full flex justify-center mb-[40px]">
                                <button className="w-[200px] h-[50px] bg-pink-600 text-white text-xl font-semibold rounded-md hover:bg-white hover:text-pink-600 border-2 border-pink-400"
                                    onClick={
                                        ()=>{
                                            addToCart(product, 1)
                                            toast.success("Product Added to cart successfully")
                                            // console.log(getCart());
                                        }
                                    }
                                >
                                    Add to Cart
                                </button>
                                <button className="w-[200px] h-[50px] bg-pink-600 text-white text-xl font-semibold rounded-md hover:bg-white hover:text-pink-400 border-2 border-pink-400 ml-5">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
            }
            {
                status == "error" && 
                    <div>
                        <h1>Product is not available</h1>
                    </div>
            }
        </div>
    )
}