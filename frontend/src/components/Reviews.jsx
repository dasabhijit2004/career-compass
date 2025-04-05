import React from 'react';

const reviews = [
  {
    name: 'John Doe',
    text: 'Career Compass helped me land my dream job! The guidance and resources are top-notch.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    text: 'A fantastic platform! The career advice and resume tips were invaluable.',
    rating: 4,
  },
  {
    name: 'Emily Johnson',
    text: 'The best career resource I’ve ever used. Highly recommended for job seekers!',
    rating: 5,
  },
];

const ReviewCard = ({ name, text, rating }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full sm:w-[300px] min-h-[220px] transition-transform hover:scale-105 hover:shadow-xl hover:border-purple-500">
      <p className="italic text-gray-600 mb-4">"{text}"</p>
      <div className="flex mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-right font-semibold text-gray-800">- {name}</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
