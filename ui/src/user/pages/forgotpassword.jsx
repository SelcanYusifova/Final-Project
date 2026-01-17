import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
import emailjs from "@emailjs/browser";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false); // inline validation

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!email.trim()) return; // boşdursa yalnız inline mesaj çıxacaq

        try {
            // Fake API ilə istifadəçi yoxlaması
            const res = await fetch("http://localhost:3000/users");
            const data = await res.json();
            const user = data.find(u => u.email === email);

            if (!user) {
                toast.error("Bu email ilə hesab tapılmadı!", {
                    position: "top-center",
                    autoClose: 5000,
                    transition: Bounce
                });
                return;
            }

            // EmailJS üçün data
            const emailData = {
                email: email,               // ⬅️ BUNU ƏLAVƏ ET
                user_name: user.name || "User",
                link: `http://localhost:5173/resetpassword?email=${email}`
            };

            // Email göndər
            await emailjs.send(
                "service_3prylp8",
                "template_lr2t76g",
                emailData,
                "qn5HIhBnGTdL6gST0"
            );

            toast.success("Şifrə yeniləmə maili göndərildi!", {
                position: "top-center",
                autoClose: 5000,
                transition: Bounce
            });

        

            setEmail("");
            setSubmitted(false);

        } catch (err) {
            console.error(err);
            toast.error("Mail göndərilərkən xəta baş verdi!", {
                position: "top-center",
                autoClose: 5000,
                transition: Bounce
            });
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
                <form
                    className="w-full max-w-[420px] mx-auto px-6"
                    onSubmit={handleForgotPassword}
                >
                    <h2 className="text-[20px] font-[600] tracking-wide mb-[48px] text-center">
                        Forgot Password
                    </h2>

                    <div className="relative mb-[48px]">
                        <input
                            type="email"
                            id="email"
                            placeholder=" "
                            className="peer w-full bg-transparent border-b border-black outline-none py-[6px] text-[14px] focus:border-b-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* INLINE VALIDATION */}
                        {submitted && !email.trim() && (
                            <p className="text-[12px] text-red-500 font-[500] mt-[6px]">
                                Zəhmət olmasa emailinizi daxil edin!
                            </p>
                        )}
                        <label
                            htmlFor="email"
                            className="absolute left-0 top-[6px] text-[14px] font-[500] transition-all duration-200
                peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-[12px]
                peer-focus:-top-[14px] peer-focus:text-[10px]
                peer-[:not(:placeholder-shown)]:-top-[14px]
                peer-[:not(:placeholder-shown)]:text-[10px]"
                        >
                            Email*
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white px-[48px] py-[12px] text-[12px] font-[600] tracking-widest transition hover:bg-[#1E1E1E] cursor-pointer"
                    >
                        Go
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
