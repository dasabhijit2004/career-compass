import React, { useState } from 'react';
import axios from 'axios';
import { Briefcase, Edit, Star, Users } from 'lucide-react';

const JobKeyMatcher = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [responseData, setResponseData] = useState('');

  const features = [
    { text: 'Beat the ATS Bots', icon: <Briefcase className='w-10 h-10 md:w-12 md:h-12' /> },
    { text: 'Tailor Your Resume Instantly', icon: <Edit className='w-10 h-10 md:w-12 md:h-12' /> },
    { text: 'Highlight Relevant Skills', icon: <Star className='w-10 h-10 md:w-12 md:h-12' /> },
    { text: 'Stand Out from the Crowd', icon: <Users className='w-10 h-10 md:w-12 md:h-12' /> }
  ];

  const handleSubmit = async () => {
    try {
      console.log(jobDescription);
      const res = await axios.post('http://localhost:8080/api/resume-keywords', {
        jobDescription: jobDescription
      });
      console.log(res.data.keywords.choices[0].message.content);
      console.log("---------\n");
      console.log(typeof res);
      setResponseData(res.data.keywords.choices[0].message.content); // adjust based on your backend response shape
    } catch (err) {
      console.error(err);
      setResponseData('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 lg:mb-12 text-center">JobKey Matcher</h1>
      
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8 lg:gap-16">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10 w-full">
          {features.map((feature, index) => (
            <div key={index} className="p-4 md:p-6 lg:p-8 bg-white shadow-lg md:shadow-xl rounded-xl md:rounded-2xl text-center space-y-2 md:space-y-4">
              <div className="text-4xl md:text-5xl flex justify-center">{feature.icon}</div>
              <p className="text-lg md:text-xl font-semibold">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full lg:w-96">
          <input 
            type="text" 
            placeholder="Enter the job description" 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="p-3 md:p-4 lg:p-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full" 
          />
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 md:px-8 md:py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base md:text-lg font-semibold shadow-md"
          >
            Submit
          </button>
          <div className="p-4 md:p-6 mt-2 md:mt-4 lg:mt-6 bg-gray-100 rounded-lg w-full h-32 md:h-40 lg:h-48 shadow-inner overflow-y-auto">
            {responseData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobKeyMatcher;
