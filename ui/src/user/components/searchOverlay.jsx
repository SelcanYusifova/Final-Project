import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import Products from "./products";
import { useTranslation } from "react-i18next";

function SearchOverlay({ onClose, theme }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;

      recognitionInstance.lang = i18n.language === 'az' ? 'az-AZ' :
        i18n.language === 'en' ? 'en-US' : 'tr-TR';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearch(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [i18n.language]);

  useEffect(() => {
    fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.flatMap((cat) =>
          Object.values(cat.products).flat()
        );
        setProducts(allProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleVoiceSearch = () => {
    if (!recognition) {
      alert('Səsli axtarış bu brauzerdə dəstəklənmir. Chrome və ya Edge istifadə edin.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  
  const filtered = products.filter((p) =>
    p.name[i18n.language].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`fixed inset-0 z-[9999] px-10 pt-[120px] overflow-y-auto
      ${theme === "light" ? "bg-white" : "bg-black"}
    `}>
    
      <button
        onClick={onClose}
        className={`absolute cursor-pointer top-10 right-10 text-[28px] hover:text-gray-500 duration-150
          ${theme === "light" ? "text-black" : "text-white"}
        `}
      >
        <IoMdClose />
      </button>

      <h1 className={`text-[42px] mb-8 search
        ${theme === "light" ? "text-gray-700" : "text-gray-300"}
      `}>
        {t("searchTitle")}
      </h1>

      <div className="relative w-full mb-16">
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className={`w-full border-b text-[24px] py-4 pr-28 outline-none placeholder
            ${theme === "light"
              ? "border-black bg-white text-black placeholder-gray-400"
              : "border-white bg-black text-white placeholder-gray-500"
            }
          `}
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className={`absolute right-16 top-1/2 -translate-y-1/2 p-2 cursor-pointer transition-all duration-200
              ${theme === "light"
                ? 'text-gray-500'
                : 'text-gray-400'
              }
            `}
            title="Təmizlə"
          >
            <IoMdClose className="text-[22px]" />
          </button>
        )}

        <button
          onClick={toggleVoiceSearch}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full cursor-pointer transition-all duration-300
            ${isListening
              ? 'bg-red-500 text-white animate-pulse'
              : theme === "light"
                ? 'bg-gray-200 text-gray-700'
                : 'bg-gray-700 text-gray-300'
            }
          `}
          title={isListening ? "Dinləməni dayandır" : "Səsli axtarış"}
        >
          {isListening ? (
            <FaMicrophoneSlash className="text-[20px]" />
          ) : (
            <FaMicrophone className="text-[20px]" />
          )}
        </button>
      </div>

      {isListening && (
        <div className={`mb-8 text-center text-[18px] animate-pulse
          ${theme === "light" ? "text-gray-600" : "text-gray-400"}
        `}>
          🎤  {t("listening_speak")}
        </div>
      )}

      {search && (
        <div className="row px-4">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <Products
                key={p.id}
                pro={p}
                colSize={3}
                onClose={onClose}
                theme={theme}
              />
            ))
          ) : (
            <p className={`mt-10 text-center text-[18px] ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
              {t("no_result_found")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchOverlay;