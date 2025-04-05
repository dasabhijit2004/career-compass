import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth

const Quiz = () => {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    const user = auth.currentUser;
    if (user) {
      navigate("/quiz");
    } else {
      alert("Please login to take the test.");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full bg-gradient-to-b from-purple-100 to-pink-100 px-4 py-12">
      <div className="w-full text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Take your career quiz</h1>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Suspendisse varius enim in eros elementum tristique.
        </p>

        {/* Button with navigation */}
        <div className="flex justify-center w-full gap-3 px-6">
          <button 
            onClick={handleTakeTest}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                       text-white font-medium rounded-lg hover:opacity-90 transition"
          >
            Take Test
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          By clicking Take Test you’re confirming that you agree with our{" "}
          <a href="#" className="text-purple-500 hover:underline">Terms and Conditions</a>.
        </p>
      </div>
    </div>
  );
};

export default Quiz;
