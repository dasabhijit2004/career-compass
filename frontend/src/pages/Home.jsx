import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [userName, setUserName] = useState('');
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserName(data.name);
            setName(data.name);
            setAge(data.age);
            setEducation(data.education);
            setDetailsSaved(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      alert('Logout failed. Please try again.' + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          name,
          age,
          education,
        });
        setUserName(name);
        setDetailsSaved(true);
        localStorage.setItem('userName', name);
        alert('Details saved successfully!');
        setEditMode(false);
      } else {
        alert('User not logged in');
      }
    } catch (error) {
      alert('Failed to save details: ' + error); 
    }
  };

  const handleQuizNavigation = () => {
    navigate('/quiz');
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
      setDetailsSaved(true);
    }
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen p-4">
      <div className="w-full flex justify-end p-4">
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-all">Logout</button>
      </div>
      {userName && <h2 className="text-2xl font-bold mb-4">Welcome, {userName}!</h2>}
      {detailsSaved && !editMode && (
        <>
          <button onClick={handleQuizNavigation} className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all mb-4">Take the Quiz</button>
          <button onClick={toggleEditMode} className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition-all">Edit Profile</button>
        </>
      )}
      {editMode && (
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PhD">PhD</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
