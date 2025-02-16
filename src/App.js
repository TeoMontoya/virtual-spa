import React, { useState } from "react";
import { Heart, Music, Moon, Sun, Cloud } from "lucide-react";

const VirtualSpa = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [hearts, setHearts] = useState([]);

  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      left: Math.random() * 80 + 10, // 10-90%
      animationDuration: Math.random() * 2 + 2, // 2-4s
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
    }, newHeart.animationDuration * 1000);
  };

  const messages = [
    "Take a deep breath...",
    "Close your eyes for a moment...",
    "Feel the stress melt away...",
    "You deserve this peaceful moment...",
    "Think of something that makes you smile...",
    "I'm thinking of you right now...",
    "Sending you virtual hugs...",
  ];

  const changeMessage = () => {
    const newMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(newMessage);
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-rose-50 text-gray-800"
      }`}
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500"
          >
            {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <h1 className="text-2xl font-semibold text-center">Virtual Spa</h1>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500"
          >
            <Music size={24} className={isPlaying ? "text-pink-500" : ""} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative h-64 bg-gradient-to-b from-pink-200 to-purple-200 rounded-lg overflow-hidden shadow-lg">
            {hearts.map((heart) => (
              <div
                key={heart.id}
                className="absolute animate-float text-pink-500"
                style={{
                  left: `${heart.left}%`,
                  bottom: "0",
                  animation: `float ${heart.animationDuration}s ease-out forwards`,
                }}
              >
                <Heart size={24} fill="currentColor" />
              </div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={addHeart}
                className="p-4 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <div className="relative">
                  <Cloud size={48} className="text-pink-500" />
                  <Heart
                    size={24}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                  />
                </div>
              </button>
            </div>
          </div>

          <div
            className="p-6 rounded-lg text-center cursor-pointer transition-colors"
            onClick={changeMessage}
          >
            <p className="text-lg font-medium min-h-[3rem] transition-opacity duration-300">
              {message || "Tap here for a relaxing message..."}
            </p>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm opacity-75">Made with love for you ❤️</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-300px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default VirtualSpa;
