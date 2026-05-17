import { BsTrash } from "react-icons/bs";
import getCart, { addToCart, removeFromCart } from "../../utils/cart";
import { useEffect, useState } from "react";


export default function CartPage() {

    const [cartLoaded, setCartLoaded] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (cartLoaded == false) {
            const cart = getCart();
            setCart(cart);
            setCartLoaded(true);
        }
    }, [cartLoaded]);



    return (
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-[700px]">
                {
                    cart.map(
                        (item, index)=>{
                            return (
                                <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex items-center justify-between relative p-1 ">
                                    <button className="absolute
                                                       right-[-50px] 
                                                       bg-red-600 
                                                       w-[40px] h-[40px] 
                                                       rounded-full 
                                                       text-white 
                                                       flex items-center justify-center
                                                       hover:bg-red-700
                                                       shadow-2xl
                                                       cursor-pointer"
                                                       
                                                       onClick={
                                                        ()=>{
                                                            removeFromCart(item.productId);
                                                            setCartLoaded(false);
                                                        }
                                                       }
                                                       > 
                                        <BsTrash /> 
                                    </button>

                                    <img src={item.image} className="h-full aspect-square object-cover" />

                                    <div className="h-full max-w-[300px] w-[300px] overflow-hidden ">
                                        <h1 className="text-xl font-bold">{item.name}</h1>
                                        <h1 className="text-xs ">{item.altNames.join(" | ")}</h1>
                                        <h1 className="text-lg">{item.price}</h1>
                                    </div>

                                    <div className="w-[100px] h-full flex items-center justify-center">
                                        <button className="w-[30px] h-[30px] bg-black text-white rounded-full font-bold flex items-center justify-center cursor-pointer mr-[10px]"
                                            onClick={
                                                ()=>{
                                                    addToCart(item, -1);
                                                    setCartLoaded(false);
                                                }
                                            }
                                        >
                                            -
                                        </button>

                                        <h1 className="text-2xl font-bold">{item.quantity}</h1>

                                        <button className="w-[30px] h-[30px] bg-black text-white rounded-full font-bold flex items-center justify-center cursor-pointer ml-[10px]"
                                            onClick={
                                                ()=>{
                                                    addToCart(item, 1);
                                                    setCartLoaded(false);
                                                }
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="w-[100px] h-full flex items-center justify-center">
                                        <h1 className="text-xl "> Rs: {(item.price * item.quantity).toFixed(2)}</h1>
                                    </div>
                                </div>
                                
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}