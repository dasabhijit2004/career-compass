import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const Pricing = () => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login to proceed.");
      navigate("/login");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("User data not found in database.");
        return;
      }

      // Simulate payment success
      alert("Payment successful! Updating your premium access...");

      // Update isPremium to true
      await updateDoc(userRef, {
        isPremium: true,
      });

      // Redirect and open the PDF
      // window.open("/path-to-your-result.pdf", "_blank"); // Replace with actual PDF path
      navigate("/result");
    } catch (error) {
      console.error("Error updating premium status:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Unlock Your Full Career Report</h1>
        <p className="text-gray-600 mb-6">
          Get access to your complete AI-powered career report in PDF format for just <span className="font-semibold">$2</span>.
        </p>
        <button
          onClick={handlePayment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
        >
          Pay $2 & Download PDF
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Pricing;
