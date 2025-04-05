import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const CareerHero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleProtectedRoute = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      alert("Please sign in to access this feature.");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen bg-white px-6 md:px-16 py-12 gap-12">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-2xl space-y-6 text-center md:text-left">
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            Future-Proof Your Career
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
            Your Career Journey Is Unique,
            <br />
            <span className="text-black">Let's Craft Your Path Together.</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Take the test to discover how you can maximize your career
            potential with our AI-powered counseling platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <button
              onClick={() => handleProtectedRoute("/resume-generation")}
              className="px-8 py-3 border border-purple-500 text-purple-500 rounded-lg font-semibold hover:bg-purple-100 transition"
            >
              Generate Resume
            </button>
            <button
              onClick={() => handleProtectedRoute("/quiz")}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            >
              Take AI Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/hero.jpg"
          alt="AI Career Guide"
          className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] max-w-[600px] rounded-[30px] shadow-2xl transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default CareerHero;
