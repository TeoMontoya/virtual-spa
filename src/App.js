import React, { useState, useEffect } from "react";
import { Heart, Music, Moon, Sun, Cloud, Calendar, Clock } from "lucide-react";

const VirtualSpa = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [hearts, setHearts] = useState([]);
  const [hugs, setHugs] = useState([]);
  const [isHugging, setIsHugging] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  // Replace these with your own messages and date!
  const loveNotes = [
    "I love how you scrunch your nose when you laugh",
    "Remember when we first met? My heart still beats the same way",
    "Your smile brightens my darkest days",
    "Distance means so little when someone means so much",
    "Every day with you is a wonderful adventure",
    // Add more personal messages here!
  ];

  const nextMeetingDate = "2024-03-01"; // Replace with your next meeting date!

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(nextMeetingDate) - new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        };
      }

      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      left: Math.random() * 80 + 10,
      animationDuration: Math.random() * 2 + 2,
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
    }, newHeart.animationDuration * 1000);
  };

  const sendVirtualHug = () => {
    setIsHugging(true);
    if (window.navigator.vibrate) {
      window.navigator.vibrate([100, 100, 100]); // Gentle vibration pattern
    }

    // Add multiple floating hugs
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const newHug = {
          id: Date.now() + i,
          left: Math.random() * 80 + 10,
          animationDuration: Math.random() * 2 + 2,
        };
        setHugs((prev) => [...prev, newHug]);
        setTimeout(() => {
          setHugs((prev) => prev.filter((hug) => hug.id !== newHug.id));
        }, newHug.animationDuration * 1000);
      }, i * 200); // Stagger the appearance of hugs
    }

    setTimeout(() => setIsHugging(false), 2000);
  };

  const showNextNote = () => {
    setCurrentNoteIndex((prev) => (prev + 1) % loveNotes.length);
  };

  const relaxationMessages = [
    "Take a deep breath...",
    "Close your eyes for a moment...",
    "Feel the stress melt away...",
    "You deserve this peaceful moment...",
    "Think of something that makes you smile...",
    "I'm thinking of you right now...",
    "Sending you virtual hugs...",
  ];

  const changeMessage = () => {
    const newMessage =
      relaxationMessages[Math.floor(Math.random() * relaxationMessages.length)];
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
          {/* Countdown Timer */}
          <div className="bg-white bg-opacity-50 p-4 rounded-lg shadow-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar size={20} className="text-pink-500" />
              <h2 className="text-lg font-medium">Until I Hold You</h2>
            </div>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{timeLeft.days || 0}</p>
                <p className="text-sm">days</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{timeLeft.hours || 0}</p>
                <p className="text-sm">hours</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{timeLeft.minutes || 0}</p>
                <p className="text-sm">mins</p>
              </div>
            </div>
          </div>

          {/* Main Spa Area */}
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

          {/* Love Notes */}
          <div
            className="bg-white bg-opacity-50 p-6 rounded-lg text-center cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl"
            onClick={showNextNote}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart size={20} className="text-pink-500" />
              <h2 className="text-lg font-medium">Love Notes</h2>
            </div>
            <p className="text-lg italic min-h-[3rem] transition-opacity duration-300">
              "{loveNotes[currentNoteIndex]}"
            </p>
            <p className="text-sm mt-2 text-gray-600">Tap to read next note</p>
          </div>

          {/* Virtual Hug Button */}
          <div className="relative">
            {hugs.map((hug) => (
              <div
                key={hug.id}
                className="absolute z-10 animate-float text-pink-500"
                style={{
                  left: `${hug.left}%`,
                  bottom: "0",
                  animation: `float ${hug.animationDuration}s ease-out forwards`,
                }}
              >
                🤗
              </div>
            ))}
            <button
              onClick={sendVirtualHug}
              className={`w-full p-4 rounded-lg bg-pink-500 text-white font-medium shadow-lg 
                transition-all duration-300 ${
                  isHugging ? "scale-110" : "hover:scale-105"
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🤗</span>
                <span>{isHugging ? "Hugging you!" : "Send Virtual Hug"}</span>
                <span className="text-xl">🤗</span>
              </div>
            </button>
          </div>

          {/* Relaxation Messages */}
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
