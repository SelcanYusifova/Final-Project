import React, { useEffect, useState } from "react";
import { BsBasket3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { toast, Bounce } from "react-toastify";

function Basket() {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load basket
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/basket")
      .then(res => res.json())
      .then(data => {
        const userBasket = data.filter(item => item.userId === userId);
        setCartItems(userBasket);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  // 🔹 Quantity update
  const updateQuantity = async (basketItemId, delta) => {
    const item = cartItems.find(i => i.id === basketItemId);
    if (!item) return;

    const newQty = Math.max(1, item.quantity + delta);

    setCartItems(prev =>
      prev.map(i =>
        i.id === basketItemId ? { ...i, quantity: newQty } : i
      )
    );

    await fetch(`http://localhost:3000/basket/${basketItemId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ quantity: newQty })
    });
  };

  // 🔹 Remove item
  const removeItem = async (basketItemId) => {
    setCartItems(prev => prev.filter(i => i.id !== basketItemId));

    await fetch(`http://localhost:3000/basket/${basketItemId}`, {
      method: "DELETE"
    });

    toast.success("Product removed from cart", {
      position: "top-center",
      autoClose: 2000,
      transition: Bounce
    });
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔹 Loading
  if (loading) {
    return (
      <div className="text-center mt-[260px]">
        <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  // 🔹 Not logged in
  if (!userId) {
    return (
      <div className="w-[400px] m-auto mt-[260px] text-center">
        <BsBasket3 className="text-[48px] mb-6 mx-auto" />
        <h2 className="mb-6 text-[20px]">
          Log in to your account to add products to the cart.
        </h2>
        <Link to="/login">
          <button className="cursor-pointer w-full bg-[#e5e5e5] py-3 hover:bg-black hover:text-white transition">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  // 🔹 Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-[260px]">
        <BsBasket3 className="text-[48px] mb-4 mx-auto" />
        <h2 className="text-[20px] mb-6">The cart is empty.</h2>
        <Link to="/">
          <button className="cursor-pointer w-[400px] bg-[#e5e5e5] py-3 hover:bg-black hover:text-white transition">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto mt-[200px] px-4 flex gap-8">

      {/* LEFT */}
      <div className="flex-1 space-y-4">
        <h1 className="text-[24px] font-semibold">
          Cart ({cartItems.length})
        </h1>

        {cartItems.map(item => (
          <div
            key={item.id}
            className="flex gap-4 p-4 border rounded-xl bg-white"
          >
            <div
              className="w-[120px] h-[140px] cursor-pointer"
              onClick={() => navigate(`/allproducts/${item.productId}`)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex justify-between">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-[13px] text-gray-500">
                  {item.color && `Color: ${item.color}`}{" "}
                  {item.size && `• Size: ${item.size}`}
                </p>

                <div className="flex items-center gap-3 border rounded-full border-gray-500 px-3 py-1 mt-3 w-fit">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-gray-500 hover:text-black transition"
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus size={14} className="cursor-pointer" />
                  </button>
                  <span className="text-[14px] font-medium min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-gray-500 hover:text-black transition"
                  >
                    <FiPlus className="cursor-pointer" size={14} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 mt-3"
                >
                  <FiTrash2 className="cursor-pointer text-[20px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="w-[350px] sticky top-[120px] border rounded-xl p-6 h-fit">
        <h3 className="text-[18px] font-semibold mb-4">Order Summary</h3>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <div className="flex justify-between font-bold text-[18px] border-t pt-4">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <button className="w-full bg-black text-white py-3 mt-6">
          Complete Order
        </button>
      </div>
    </div>
  );
}

export default Basket;
