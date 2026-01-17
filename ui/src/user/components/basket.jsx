import React, { useEffect, useState } from 'react';
import { BsBasket3 } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { toast, Bounce } from 'react-toastify';

function Basket() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setUser(true);
      fetch("http://localhost:3000/basket")
        .then(res => res.json())
        .then(data => {
          const userItems = data.filter(item => item.id === id);
          setCartItems(userItems);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const updateQuantity = async (itemId, change) => {
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;

    const newQty = Math.max(1, item.quantity + change);

    setCartItems(prev =>
      prev.map(i =>
        i.id === itemId ? { ...i, quantity: newQty } : i
      )
    );

    await fetch(`http://localhost:3000/basket/${itemId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ quantity: newQty })
    });
  };

  const removeItem = async (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));

    await fetch(`http://localhost:3000/basket/${itemId}`, {
      method: "DELETE"
    });

    toast.success("Product removed from cart", {
      position: "top-center",
      autoClose: 2000,
      transition: Bounce,
    });
  };

  const goToDetail = (productId) => {
    navigate(`/allproducts/${productId}`);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="text-center mt-[260px]">
        <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-[400px] m-auto mt-[260px] mb-[60px] flex flex-col items-center">
        <BsBasket3 className="text-[48px] mb-[24px]" />
        <h2 className="mb-[30px] text-[20px] text-center">
          Log in to your account to add a product to the cart.
        </h2>
        <Link to="/login">
          <button className="w-[400px] cursor-pointer bg-[#e5e5e5] text-black py-3 text-[14px] hover:bg-black hover:text-white transition">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-[260px] mb-[100px]">
        <BsBasket3 className="text-[48px] mb-4 inline-block" />
        <h2 className="text-[20px] mb-[24px]">The cart is empty.</h2>
        <Link to="/">
          <button className="w-[400px] cursor-pointer bg-[#e5e5e5] text-black py-3 text-[14px] hover:bg-black hover:text-white transition">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto mt-[200px] mb-[100px] px-4 flex gap-8">

      {/* Left: Cart Items */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-[24px] font-semibold mb-4">Cart ({cartItems.length})</h1>

        {cartItems.map((item) => (
          <div key={item.productId} className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">

            {/* Product Image */}
            <div
              className="w-[120px] h-[140px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
              onClick={() => goToDetail(item.productId)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between flex-1">

              {/* Title + Counter + Remove */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-[15px] font-medium text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[13px] text-gray-500">
                    {item.color && `Color: ${item.color}`}
                    {item.size && ` · Size: ${item.size}`}
                  </p>

                  {/* Counter */}
                  <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-1 mt-3 w-fit">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-gray-500 hover:text-black transition"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus size={14} />
                    </button>

                    <span className="text-[14px] font-medium min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-gray-500 hover:text-black transition"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="text-right">
                  {item.oldPrice && (
                    <p className="text-[12px] text-gray-400 line-through mb-1">
                      {(item.oldPrice * item.quantity).toFixed(2)} €
                    </p>
                  )}
                  <p className="text-[16px] font-semibold text-gray-900 mb-3">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Summary Card (Fixed) */}
      <div className="w-[350px] h-fit sticky top-[120px] border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
        <h3 className="text-[18px] font-semibold mb-4">Order Summary</h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-[14px]">
            <span className="text-gray-600">Products:</span>
            <span className="font-medium">
              {cartItems.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>

          <div className="flex justify-between text-[14px]">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">{totalPrice.toFixed(2)} €</span>
          </div>

          <div className="flex justify-between text-[14px]">
            <span className="text-gray-600">Delivery:</span>
            <span className="font-medium">Free</span>
          </div>
        </div>

        <div className="flex justify-between text-[18px] font-bold mt-4 pt-4 border-t border-gray-200">
          <span>Total:</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <button className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition text-[14px] font-medium rounded cursor-pointer">
          Complete Order
        </button>

        <Link to="/">
          <button className="w-full bg-gray-100 text-black py-3 mt-3 hover:bg-gray-200 transition text-[14px] rounded cursor-pointer">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Basket;