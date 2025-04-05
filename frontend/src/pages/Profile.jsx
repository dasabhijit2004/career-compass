import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Profile = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  };

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const handleQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="w-64 bg-white shadow-xl rounded-xl p-4 text-center space-y-4">
      <h3 className="text-xl font-semibold">👋 Hello, {userName || 'Guest'}</h3>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleQuiz}
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition"
        >
          Take Quiz
        </button>
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
