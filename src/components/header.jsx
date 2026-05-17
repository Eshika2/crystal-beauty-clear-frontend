import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

export default function Header() {
    return (
        <header className="w-full h-[70px] flex justify-around items-center bg-gray-100">
            <div className="w-[500px] h-full flex items-center justify-evenly text-pink-400 text-xl">
                <Link to="/"> Home Page </Link>
                <Link to="/products"> Products </Link>
                <Link to="/contact"> Contact </Link>
                <Link to="/reviews"> Reviews </Link>
                <Link to="/cart" className="absolute right-[50px] text-3xl"> <BsCart4 /> </Link>
            </div>

        </header>
    );
}
