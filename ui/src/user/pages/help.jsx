import React from "react";

function Help() {
    return (
        <div className="max-w-[1200px] mx-auto px-[24px] py-[80px] mt-[100px]">

           
            <h1 className="text-[32px] md:text-[40px] font-semibold mb-[24px]">
                Help & Customer Service
            </h1>
            <p className="text-[16px] text-gray-600 mb-[48px]">
                Find answers to our most frequently asked questions or contact our support team.
            </p>

            <div className="flex flex-col gap-[32px]">

              
                <div className="border-b border-gray-200 pb-[24px]">
                    <h2 className="text-[20px] font-medium mb-[8px]">Order Tracking</h2>
                    <p className="text-[14px] text-gray-600">
                        You can track your order status by logging into your account or using the tracking link sent to your email.
                    </p>
                </div>

                <div className="border-b border-gray-200 pb-[24px]">
                    <h2 className="text-[20px] font-medium mb-[8px]">Returns & Exchanges</h2>
                    <p className="text-[14px] text-gray-600">
                        Returns can be made within 30 days of purchase. Make sure your items are in original condition.
                    </p>
                </div>

                <div className="border-b border-gray-200 pb-[24px]">
                    <h2 className="text-[20px] font-medium mb-[8px]">Payment Methods</h2>
                    <p className="text-[14px] text-gray-600">
                        We accept all major credit cards, PayPal, and gift cards. All transactions are secure.
                    </p>
                </div>

                <div className="border-b border-gray-200 pb-[24px]">
                    <h2 className="text-[20px] font-medium mb-[8px]">Shipping Information</h2>
                    <p className="text-[14px] text-gray-600">
                        Orders are usually processed within 1-2 business days. Delivery times vary by location.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Help;
