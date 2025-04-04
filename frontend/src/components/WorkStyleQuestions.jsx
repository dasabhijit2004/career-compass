import React, { useState } from 'react';

const options = [
  "Independent", "Analytical", "Outgoing", "Methodical", "Decisive", 
  "Curious", "Practical", "Observant", "Visionary", "Structured", 
  "Adaptable", "Social", "Introverted", "Logical", "Empathetic", 
  "Multitasker", "Leader", "Direct", "Competitive", "Collaborative"
];

const WorkStyleQuestion = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    console.log("Selected Answers (Array format):", selectedOptions);
    alert(`You selected: ${selectedOptions.join(", ")}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-md max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          How would you describe your preferred way of working, thinking, and interacting with others?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center bg-gray-200 p-2 rounded">
              <input
                type="checkbox"
                id={option}
                name="workStyle"
                value={option}
                onChange={handleOptionChange}
                checked={selectedOptions.includes(option)}
                className="mr-2"
              />
              <label htmlFor={option} className="text-lg">{option}</label>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            disabled={selectedOptions.length === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkStyleQuestion;
