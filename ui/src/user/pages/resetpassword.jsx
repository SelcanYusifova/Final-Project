import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

function ResetPassword() {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [submitted, setSubmitted] = useState(false); // inline validation
  const [userNotFound, setUserNotFound] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

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
        toast.error("Hesab tapılmadı!", { position: "top-center", autoClose: 5000, transition: Bounce });
        return;
      }

      const updatedUser = { ...user, pass };
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
      });

      toast.success("Şifrəniz yeniləndi!", { position: "top-center", autoClose: 5000, transition: Bounce });
      navigate("/login");

    } catch (err) {
      console.error(err);
      toast.error("Şifrə yenilənərkən xəta baş verdi!", { position: "top-center", autoClose: 5000, transition: Bounce });
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT IMAGE */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://static.zarahome.net/assets/public/7d07/fdf6/683344e29e9a/44aa83265c4b/index/index.jpg?ts=1726667724254&d=20260106')" }}
      />

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 flex items-center">
        <form className="w-full max-w-[420px] mx-auto px-6" onSubmit={handleReset}>
          <h2 className="text-[20px] font-[600] tracking-wide mb-[48px] text-center">
            Reset Password
          </h2>

          {/* New Password */}
          <div className="relative mb-[32px]">
            <input
              type={showPass ? "text" : "password"}
              placeholder=" "
              className="
                peer w-full bg-transparent
                border-b border-black
                outline-none
                py-[6px] pr-[32px] text-[14px]
                focus:border-b-2
              "
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {submitted && !pass && (
              <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                Zəhmət olmasa yeni şifrənizi daxil edin!
              </p>
            )}
            <label className="
                absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
                peer-focus:-top-[14px] peer-focus:text-[10px]
                peer-[:not(:placeholder-shown)]:-top-[14px]
                peer-[:not(:placeholder-shown)]:text-[10px]
              ">
              New Password*
            </label>
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-0 top-[6px] text-black"
            >
              {showPass ? <FiEyeOff className="text-[18px] cursor-pointer" /> : <FiEye className="text-[18px] cursor-pointer" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-[48px]">
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder=" "
              className="
                peer w-full bg-transparent
                border-b border-black
                outline-none
                py-[6px] pr-[32px] text-[14px]
                focus:border-b-2
              "
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            {submitted && !confirmPass && (
              <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                Zəhmət olmasa şifrənizi təsdiqləyin!
              </p>
            )}
            {passwordMismatch && (
              <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                Şifrələr eyni deyil!
              </p>
            )}
            {userNotFound && (
              <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                Bu email ilə hesab tapılmadı!
              </p>
            )}
            <label className="
                absolute left-0 top-[6px] text-[12px] font-[500] transition-all duration-200
                peer-focus:-top-[14px] peer-focus:text-[10px]
                peer-[:not(:placeholder-shown)]:-top-[14px]
                peer-[:not(:placeholder-shown)]:text-[10px]
              ">
              Confirm Password*
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-0 top-[6px] text-black"
            >
              {showConfirmPass ? <FiEyeOff className="text-[18px] cursor-pointer" /> : <FiEye className="text-[18px] cursor-pointer" />}
            </button>
          </div>

          <button
            type="submit"
            className="
              w-full bg-black text-white
              px-[48px] py-[12px]
              text-[12px] font-[600]
              tracking-widest
              transition hover:bg-[#1E1E1E]
              cursor-pointer
            "
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
