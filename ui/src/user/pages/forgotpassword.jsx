import React, { useState, useEffect } from "react";
import { toast, Bounce } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
function ForgotPassword() {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
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

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!email.trim()) return;

        try {
            const res = await fetch("http://localhost:3000/users");
            const data = await res.json();
            const user = data.find(u => u.email === email);

            if (!user) {
                toast.error("Bu email ilə hesab tapılmadı!", {
                    position: "top-center",
                    autoClose: 5000,
                    transition: Bounce,
                    theme: theme === "dark" ? "dark" : "light"
                });
                return;
            }

            const emailData = {
                email: email,
                user_name: user.name || "User",
                link: `http://localhost:5173/resetpassword?email=${email}`
            };

            await emailjs.send(
                "service_3prylp8",
                "template_lr2t76g",
                emailData,
                "qn5HIhBnGTdL6gST0"
            );

            toast.success("Şifrə yeniləmə maili göndərildi!", {
                position: "top-center",
                autoClose: 5000,
                transition: Bounce,
                theme: theme === "dark" ? "dark" : "light"
            });

            setEmail("");
            setSubmitted(false);

        } catch (err) {
            console.error(err);
            toast.error("Mail göndərilərkən xəta baş verdi!", {
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
                <form
                    className="w-full max-w-[420px] mx-auto px-6"
                    onSubmit={handleForgotPassword}
                >
                    <h2 className={`text-[20px] font-[600] tracking-wide mb-[48px] text-center
                        ${theme === "light" ? "text-black" : "text-white"}`}>
                        {t("forgot")}
                    </h2>

                    <div className="relative mb-[48px]">
                        <input
                            type="email"
                            id="email"
                            placeholder=" "
                            className={`peer w-full bg-transparent outline-none py-[6px] text-[14px]
                                border-b focus:border-b-2 transition-colors
                                ${theme === "light"
                                    ? "border-black text-black"
                                    : "border-white text-white"}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {submitted && !email.trim() && (
                            <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                                Zəhmət olmasa emailinizi daxil edin!
                            </p>
                        )}
                        <label
                            htmlFor="email"
                            className={`absolute left-0 top-[6px] text-[14px] font-[500] transition-all duration-200
                                peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-[12px]
                                peer-focus:-top-[14px] peer-focus:text-[10px]
                                peer-[:not(:placeholder-shown)]:-top-[14px]
                                peer-[:not(:placeholder-shown)]:text-[10px]
                                ${theme === "light" ? "text-black" : "text-white"}`}>
                            {t("email")}
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={`w-full px-[48px] py-[12px] text-[12px] font-[600]
                            tracking-widest transition cursor-pointer
                            ${theme === "light"
                                ? "bg-black text-white hover:bg-[#1E1E1E]"
                                : "bg-white text-black hover:bg-gray-200"}`}>
                        {t("go")}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;