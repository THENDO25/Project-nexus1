'use client';
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cart from "./cart";



const icons = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isCartOpen, setIsCartopen] = useState(false)

    const router = useRouter()

    const isLoggedIn = false

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login")
        }
        setIsProfileOpen((prev)=>!prev);
    };

    return (
        <div className='flex items-center relative gap-5 '>
            {/*profile*/}
            <CgProfile width={24} height={24} className="cursor-pointer" onClick={handleProfile} />
            {isProfileOpen && <div className="absolute p-4 rounded-md top-12 left-0 text-sm  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">               
                <Link href="/">Profile</Link>
                <div className="mt-2 cursor-pointer">Logout</div>
            </div>}
            {/*favourite*/}
            <FaRegHeart width={24} height={24} className="cursor-pointer" />
            {/*cart*/}
            <div className="relative">
            <IoCartOutline width={24} height={24} className="cursor-pointer" 
            onClick={()=>setIsCartopen(prev=>!prev)}
            />
            <div className="absolute -top-4 -right-4 w-5 h-5 bg-[#EF233C] rounded-full text-white text-sm flex items-center justify-center cursor-pointer">0</div>
            </div>
            {isCartOpen && <Cart cartItems={[]} removeFromCart={function (id: number): void {
                throw new Error("something went wrong.");
            } } updateQuantity={function (id: number, quantity: number): void {
                throw new Error("Function not implemented.");
            } } />}
            
            <IoMdNotificationsOutline
        width={24}
        height={24}
        className="cursor-pointer"
      />
        </div>
    );
};
export default icons
