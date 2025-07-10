import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaCopyright, FaArrowUp } from 'react-icons/fa';

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [tip, setTip] = useState('');

  useEffect(() => {
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setTip(randomTip);
  }, []);

  return (
    <footer className="bg-[#0096C7] text-white py-10 px-6 md:px-20 relative shadow-inner">
      <div className="max-w-6xl mx-auto text-center space-y-6">

        {/* Brand & Slogan */}
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-wide">BookTheDoc</h2>
          <p className="text-sm md:text-base font-light text-white/90">
            Connecting you to care, effortlessly.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2">
            <FaPhoneAlt />
            <span>@123456789</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <span>support@bookthedoc.com</span>
          </div>
        </div>

        {/* Health Tip */}
        <div className="text-sm md:text-base italic text-white bg-[#0077b6] px-4 py-2 rounded-lg shadow-md w-fit mx-auto">
          💡 {tip}
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/80">
          <FaCopyright />
          <span>BookTheDoc 2025. All rights reserved.</span>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 md:right-10 md:bottom-10 bg-white text-[#0096C7] p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}

export default Footer;
