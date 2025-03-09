"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "./menu";
import Icons from "./icons";
import Searchcontainer from "./searchcontainer";
import Cart from "./cart";
import About from "./about"; 

const Navbar = () => {
  const [activePage, setActivePage] = useState<string | null>(null);

  return (
    <div className="h-20 px-4 md:px-8 lg:16 xl:32 2xl:px-64 relative">
      {/* Mobile View */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/" onClick={() => setActivePage(null)}>
          <div className="text-2xl font-bold">BigSave e-com</div>
        </Link>
        <Menu />
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex items-center h-full justify-between gap-8">
        <div className="w-1/3 xl:w-1/2 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-4" onClick={() => setActivePage(null)}>
            <Image src="/logo.png" alt="Logo" width={24} height={24} />
            <div className="text-2xl font-bold">Thendo e-com</div>
          </Link>
          <div className="hidden xl:flex gap-4 font-medium">
            <Link href="/" onClick={() => setActivePage(null)}>Home</Link>
            <Link href="/" onClick={() => setActivePage(null)}>Shop</Link>
            <Link href="/" onClick={() => setActivePage(null)}>Sale</Link>
            <Link href="#" onClick={() => setActivePage("about")}>About</Link>
            <Link href="#" onClick={() => setActivePage("cart")}>Cart</Link>
            <Link href="/" onClick={() => setActivePage(null)}>Contacts</Link>
          </div>
        </div>
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <Searchcontainer />
          <Icons />
        </div>
      </div>

      {/* Display Selected Content */}
      <div className="mt-4">
        {activePage === "cart" && <Cart cartItems={[]} updateQuantity={function (id: number, quantity: number): void {
                  throw new Error("Function not implemented.");
              } } removeFromCart={function (id: number): void {
                  throw new Error("Function not implemented.");
              } } />}
        {activePage === "about" && <About />}
      </div>
    </div>
  );
};

export default Navbar;
