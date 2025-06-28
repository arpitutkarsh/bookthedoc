import React, { useEffect, useRef, useState } from 'react';

function Captcha({ primary = '#0096C7', onValidationChange }) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const canvasRef = useRef(null);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let text = '';
    for (let i = 0; i < 5; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    setUserInput('');
    onValidationChange(false); // Reset valid state
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 200, 60);
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.3)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * 200, Math.random() * 60);
      ctx.lineTo(Math.random() * 200, Math.random() * 60);
      ctx.stroke();
    }

    ctx.font = '30px Courier New';
    ctx.fillStyle = primary;
    ctx.setTransform(1, 0.1, 0.1, 1, 0, 0);
    ctx.fillText(captchaText, 20, 40);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (captchaText) drawCaptcha();
  }, [captchaText]);

  const speakCaptcha = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(captchaText.split('').join(' '));
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const validateCaptcha = (input) => {
    const isValid = input.trim().toUpperCase() === captchaText;
    onValidationChange(isValid);
  };

  return (
    <div className="w-full max-w-md mx-auto p-2">
      <label className="text-sm font-semibold text-gray-800 mb-1 block">CAPTCHA</label>
      <div className="flex items-center gap-3 mb-2">
        <canvas ref={canvasRef} width={200} height={60} className="border rounded" />
        <div className="flex flex-col gap-1">
          <button onClick={generateCaptcha} type="button" className="text-sm text-blue-600 hover:underline">🔁 Refresh</button>
          <button onClick={speakCaptcha} type="button" className="text-sm text-blue-600 hover:underline">🔊 Voice</button>
        </div>
      </div>

      <input
        type="text"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          validateCaptcha(e.target.value);
        }}
        placeholder="Enter CAPTCHA"
        className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default Captcha;
