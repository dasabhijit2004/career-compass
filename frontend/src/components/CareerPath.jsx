import React from 'react';

const CareerPath = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white px-8 md:px-20 py-12 gap-12">
      {/* Image Container */}
      <div className="relative w-full md:w-1/2 flex justify-center">
        <img
          src="career-readiness.png" 
          alt="Career Guidance"
          className="w-full max-w-md md:max-w-lg h-auto rounded-[40px] shadow-lg"
          style={{ clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 20% 100%, 0% 80%)' }}
        />
      </div>

      {/* Text Container */}
      <div className="w-full md:w-1/2 text-black">
        <ol className="list-decimal space-y-4 text-lg">
          <li className="font-semibold">Problem-Solving and Helping Others:
            <ul className="list-disc pl-6 text-gray-600">
              <li><span className="font-bold">Educator/Teacher/Trainer:</span> Your strong agreement with ‘I find satisfaction in helping others learn’ makes this a great fit.</li>
            </ul>
          </li>

          <li className="font-semibold">Creative Fields:
            <ul className="list-disc pl-6 text-gray-600">
              <li><span className="font-bold">Artist/Designer/Writer:</span> Your enthusiasm for creating artistic works suggests you'd thrive in a creative environment.</li>
            </ul>
          </li>

          <li className="font-semibold">Technology and Innovation:
            <ul className="list-disc pl-6 text-gray-600">
              <li><span className="font-bold">Software Developer/Engineer:</span> Your fascination with technology and analytical skills suggest a great career fit.</li>
            </ul>
          </li>

          <li className="font-semibold">Project Management and Leadership:
            <ul className="list-disc pl-6 text-gray-600">
              <li><span className="font-bold">Project Manager/Team Leader:</span> Your agreement with ‘I enjoy organizing projects’ indicates strong leadership potential.</li>
            </ul>
          </li>

          <li className="font-semibold">Business and Operations:
            <ul className="list-disc pl-6 text-gray-600">
              <li><span className="font-bold">Business Analyst/Operations Manager:</span> Your interest in business and problem-solving skills could lead to success in these roles.</li>
            </ul>
          </li>
        </ol>

        <p className="mt-6 text-gray-700">
          Careers that involve problem-solving, creativity, and leadership are likely a great fit for you.
        </p>
      </div>
    </div>
  );
};

export default CareerPath;
