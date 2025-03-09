import React from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, updateQuantity, removeFromCart }) => {
  return (
    <div className="absolute p-4 rounded-md shadow-md bg-white top-12 right-0 flex flex-col gap-6 z-20 w-max">
      {cartItems.length === 0 ? (
        <div className="">Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {cartItems.map((item) => (
              <div key={item.id} className="gap-4 flex">
                <img src={item.image} alt="" className="w-16 h-20 object-cover rounded-md" />
                <div className="flex flex-col w-full justify-between">
                  <div className="flex items-center justify-between gap-6">
                    <h2 className="font-semibold">{item.title}</h2>
                    <div className="text-gray p-1 rounded-sm">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-red-500 cursor-pointer" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between font-semibold items-center">
              <span>TOTAL</span>
              <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-8 mt-4">
              <button className="rounded-md py-2 px-4 ring-1 ring-black">View Cart</button>
              <button className="rounded-md py-2 px-4 bg-black text-white">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
