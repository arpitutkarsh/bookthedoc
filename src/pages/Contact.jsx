import React from 'react';
import { assets } from '../assets/assets/assets_frontend/assets';

function Contact() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-10 px-4 md:px-16">
      <div className="text-center text-4xl font-bold text-gray-700 mb-12">
        Contact <span className="text-emerald-500">Us</span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
        <img
          className="w-full md:max-w-md rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          src={assets.contact_image}
          alt="Contact"
        />

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Our Office</h2>
          <p className="text-gray-600 mb-4">Aurangabad, Bihar, 824101</p>

          <div className="mb-6">
            <p className="text-gray-700 font-medium">Tel:</p>
            <p className="text-gray-600">(+91)-1234567890</p>
            <p className="text-gray-600">support@findthedoc.in</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Careers @FindTheDoc</h3>
          <p className="text-gray-600 mb-4">Discover exciting roles and become a part of our growing team.</p>

          <button className="bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-emerald-700 transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
