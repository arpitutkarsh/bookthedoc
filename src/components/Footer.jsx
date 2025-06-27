import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaCopyright, FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
function Footer() {
    const healthTips = [
  "💧 Stay hydrated – drink at least 8 glasses of water a day.",
  "🛌 A good night’s sleep boosts immunity and mental clarity.",
  "🥦 Eat colorful vegetables – they’re full of antioxidants.",
  "🚶‍♂️ Take a 30-minute walk every day to stay active.",
  "🧘‍♀️ Practice deep breathing to reduce stress and anxiety.",
  "😄 Laughter is good for your heart and immune system.",
  "📵 Take screen breaks every hour to protect your eyes.",
  "🍎 An apple a day may really help keep the doctor away!",
  "☀️ Get at least 10 minutes of sunlight daily for vitamin D.",
  "🧴 Don’t forget sunscreen – your skin will thank you!",
    ];

  // Scroll handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [tip, setTip] = useState('');

  useEffect(() => {
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setTip(randomTip);
  }, []);
  return (
    <footer className="bg-[#0096C7] text-white py-8 px-6 md:px-20 relative">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        
        {/* Company Name & Slogan */}
        <div>
          <h2 className="text-2xl font-bold">BookTheDoc</h2>
          <p className="text-sm mt-1">Connecting you to care, Effortlessly.</p>

        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-sm" />
            <span>@123456789</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-sm" />
            <span>support@bookthedoc.com</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center gap-2 text-sm mt-4">
          <FaCopyright />
          <span>BookTheDoc 2025. All rights reserved.</span>
        </div>
        <div className="text-sm text-white mt-6 italic">
  💡        {tip}
        </div>
        <marquee>
        <p className="text-xs text-white mt-2">
            Made with ❤️ by BookTheDoc Team
        </p>
        </marquee>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 bg-white text-[#0096C7] p-3 rounded-full shadow-md hover:bg-gray-100 transition"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}

export default Footer;
