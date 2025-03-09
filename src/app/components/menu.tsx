"use client"

import { useState } from "react";
import Link from "next/link"
import Image from "next/image"

const Menu =()=>{

const [open,setOpen]=useState(false)

    return(
        <div className="">
        <Image src="/menu.png" alt=""width={28} height={28} className="cursor-pointer"onClick={()=>setOpen((prev)=> !prev )}/>
        {
            open && (
                <div className='absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-6 text-xl z-10'>
                    <Link href="/">Home</Link>
                    <Link href="/products">Shop</Link>
                    <Link href="/about">About</Link>
                    <Link href="/">Contacts</Link>
                    <Link href="/">Account</Link>
                </div>

            )
        }

        </div>
    )
}
export default Menu