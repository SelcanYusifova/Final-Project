import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const { t, i18n } = useTranslation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setUserNotFound(false);
    setPasswordMismatch(false);

    if (!pass || !confirmPass) return;

    if (pass !== confirmPass) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();
      const user = users.find(u => u.email === email);

      if (!user) {
        setUserNotFound(true);
        toast.error("Hesab tapılmadı!", {
          position: "top-center",
          autoClose: 5000,
          transition: Bounce,
          theme: theme === "dark" ? "dark" : "light"
        });
        return;
      }

      const updatedUser = { ...user, pass };
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
      });

      toast.success("Şifrəniz yeniləndi!", {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce,
        theme: theme === "dark" ? "dark" : "light"
      });
      navigate("/login");

    } catch (err) {
      console.error(err);
      toast.error("Şifrə yenilənərkən xəta baş verdi!", {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce,
        theme: theme === "dark" ? "dark" : "light"
      });
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300
      ${theme === "light" ? "bg-white" : "bg-black"}`}>

      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://static.zarahome.net/assets/public/7d07/fdf6/683344e29e9a/44aa83265c4b/index/index.jpg?ts=1726667724254&d=20260106')" }}
      />

      <div className="w-full lg:w-1/2 flex items-center">
        <form className="w-full max-w-[420px] mx-auto px-6" onSubmit={handleReset}>
          <h2 className={`text-[20px] font-[600] tracking-wide mb-[48px] text-center
            ${theme === "light" ? "text-black" : "text-white"}`}>
             {t("reset")}
          </h2>

          <div className="relative mb-[32px]">
            <input
              type={showPass ? "text" : "password"}
              placeholder=" "
              className={`peer w-full bg-transparent outline-none py-[6px] pr-[32px] text-[14px]
                border-b focus:border-b-2 transition-colors
                ${theme === "light"
                  ? "border-black text-black"
                  : "border-white text-white"}`}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {submitted && !pass && (
              <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                {t("enterNewPass")}
              </p>
            )}
            <label className={`absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
              peer-focus:-top-[14px] peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:-top-[14px]
              peer-[:not(:placeholder-shown)]:text-[10px]
              ${theme === "light" ? "text-black" : "text-white"}`}>
               {t("newPass")}
            </label>
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className={`absolute right-0 top-[6px]
                ${theme === "light" ? "text-black" : "text-white"}`}>
              {showPass ?
                <FiEyeOff className="text-[18px] cursor-pointer" /> :
                <FiEye className="text-[18px] cursor-pointer" />}
            </button>
          </div>

          <div className="relative mb-[48px]">
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder=" "
              className={`peer w-full bg-transparent outline-none py-[6px] pr-[32px] text-[14px]
                border-b focus:border-b-2 transition-colors
                ${theme === "light"
                  ? "border-black text-black"
                  : "border-white text-white"}`}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            {submitted && !confirmPass && (
              <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                 {t("confirmPass")}
              </p>
            )}
            {passwordMismatch && (
              <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                {t("passNotMatch")}
              </p>
            )}
            {userNotFound && (
              <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                 {t("emailNotFound")}
              </p>
            )}
            <label className={`absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
              peer-focus:-top-[14px] peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:-top-[14px]
              peer-[:not(:placeholder-shown)]:text-[10px]
              ${theme === "light" ? "text-black" : "text-white"}`}>
               {t("confirmPass")}
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className={`absolute right-0 top-[6px]
                ${theme === "light" ? "text-black" : "text-white"}`}>
              {showConfirmPass ?
                <FiEyeOff className="text-[18px] cursor-pointer" /> :
                <FiEye className="text-[18px] cursor-pointer" />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full px-[48px] py-[12px] text-[12px] font-[600]
              tracking-widest transition cursor-pointer
              ${theme === "light"
                ? "bg-black text-white hover:bg-[#1E1E1E]"
                : "bg-white text-black hover:bg-gray-200"}`}>
             {t("reset")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;