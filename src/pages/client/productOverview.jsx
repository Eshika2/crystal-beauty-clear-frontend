import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"

export default function ProductOverview() {

    const params = useParams();
    // console.log(params.id);

    if (params.id == null) {
        window.location.href = "/products";
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); // loading, Loaded, error

    useEffect(
        () => {
            if (status === "loading") {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id).then(
                    (response) => {
                        // console.log(response);
                        setProduct(response.data);
                        setStatus("Loaded");
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
                    <div className="w-full h-full">
                        Product Loaded
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