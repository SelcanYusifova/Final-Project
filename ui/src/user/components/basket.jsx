import React, { useEffect, useState } from "react";
import { BsBasket3 } from "react-icons/bs";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { toast, Bounce } from "react-toastify";
import { useTranslation } from "react-i18next";


function Basket() {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const { theme } = useOutletContext(); // Layout-dan theme alırıq

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

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

  if (loading) {
    return (
      <div className="text-center mt-[260px]">
        <div className={`inline-block w-8 h-8 border-4 rounded-full animate-spin
          ${theme === "light" ? "border-gray-300 border-t-black" : "border-gray-700 border-t-white"}
        `}></div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="w-[400px] m-auto mt-[260px] text-center start">
        <BsBasket3 className={`text-[48px] mb-6 mx-auto ${theme === "light" ? "text-black" : "text-white"}`} />
        <h2 className={`mb-6 text-[20px] ${theme === "light" ? "text-black" : "text-white"}`}>
          {t("logInMessage")}
          </h2>
        <Link to="/login">
          <button className={`cursor-pointer w-full py-3 transition
            ${theme === "light"
              ? "bg-[#e5e5e5] text-black hover:bg-black hover:text-white"
              : "bg-gray-800 text-white hover:bg-white hover:text-black"
            }
          `}>
            {t("signIn")}
          </button>
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-[260px]">
        <BsBasket3 className={`text-[48px] mb-4 mx-auto ${theme === "light" ? "text-black" : "text-white"}`} />
        <h2 className={`text-[20px] mb-6 ${theme === "light" ? "text-black" : "text-white"}`}>
          {t("cartEmpty")}
        </h2>
        <Link to="/">
          <button className={`cursor-pointer w-[400px] py-3 transition
            ${theme === "light"
              ? "bg-[#e5e5e5] text-black hover:bg-black hover:text-white"
              : "bg-gray-800 text-white hover:bg-white hover:text-black"
            }
          `}>
            {t("startShopping")}
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto mt-[200px] px-4 flex gap-8 basket">

      {/* LEFT */}
      <div className="flex-1 space-y-4">
        <h1 className={`text-[24px] font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
          {t("cart")} ({cartItems.length})
        </h1>

        {cartItems.map(item => (
          <div
            key={item.id}
            className={`flex gap-4 p-4 border rounded-xl
              ${theme === "light"
                ? "bg-white border-gray-200"
                : "bg-black border-gray-700"
              }
            `}
          >
            <div
              className="w-[120px] h-[140px] cursor-pointer"
              onClick={() => navigate(`/allproducts/${item.productId}`)}
            >
              <img
                src={item.image}
                alt={item.name[i18n.language]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex justify-between">
              <div>
                <h3 className={`font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                  {item.name[i18n.language]}
                </h3>
                <p className={`text-[13px] ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  {item.color && `Color: ${item.color}`}{" "}
                  {item.size && `• ${t("size")}: ${item.size}`}
                </p>

                <div className={`flex items-center gap-3 border rounded-full px-3 py-1 mt-3 w-fit
                  ${theme === "light" ? "border-gray-500" : "border-gray-600"}
                `}>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className={`transition ${theme === "light" ? "text-gray-500 hover:text-black" : "text-gray-400 hover:text-white"}`}
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus size={14} className="cursor-pointer" />
                  </button>
                  <span className={`text-[14px] font-medium min-w-[20px] text-center
                    ${theme === "light" ? "text-black" : "text-white"}
                  `}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className={`transition ${theme === "light" ? "text-gray-500 hover:text-black" : "text-gray-400 hover:text-white"}`}
                  >
                    <FiPlus className="cursor-pointer" size={14} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className={`font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className={`mt-3 transition
                    ${theme === "light" ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-400"}
                  `}
                >
                  <FiTrash2 className="cursor-pointer text-[20px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT - Order Summary */}
      <div className={`w-[350px] sticky top-[120px] border rounded-xl p-6 h-fit
        ${theme === "light"
          ? "bg-white border-gray-200"
          : "bg-black border-gray-700"
        }
      `}>
        <h3 className={`text-[18px] font-semibold mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
          {t("orderSummary")}
        </h3>

        <div className={`flex justify-between mb-2 ${theme === "light" ? "text-black" : "text-white"}`}>
          <span>{t("subtotal")} </span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <div className={`flex justify-between font-bold text-[18px] border-t pt-4
          ${theme === "light" ? "text-black border-gray-200" : "text-white border-gray-700"}
        `}>
          <span>{t("total")} </span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <button className={`w-full py-3 mt-6 transition cursor-pointer
          ${theme === "light"
            ? "bg-gray-200 hover:bg-black hover:text-white"
            : "bg-gray-800 hover:bg-white hover:text-black"
          }
        `}>
          {t("completeOrder")}
        </button>
      </div>
    </div>
  );
}

export default Basket;