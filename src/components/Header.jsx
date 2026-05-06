import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart,  removeFromCart, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalValue = cart
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">My Store</h1>
      <div className="relative">
        <button
          className="cursor-pointer"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <FaShoppingCart className="text-2xl text-gray-700" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
        {isCartOpen && (
          <div
            className="absolute right-0 mt-2 w-80 bg-white
           border rounded shadow-lg z-50"
          >
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">Your cart is empty.</p>
              ) : (
                <>
                <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <button
                        className="text-red-500 hover:text-underline text-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button> 
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">${totalValue}</span>
                  </div>
                </div>
                <button onClick={clearCart} className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                  Clear Cart
                </button>
                </>                
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
