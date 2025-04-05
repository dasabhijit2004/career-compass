import { Sparkles, User, Send } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-white">
      <h3 className="text-gray-600 mb-2">Our values</h3>
      <h1 className="text-4xl font-bold text-black mb-8 text-center">
        AI-Powered Career Clarity – Your Future, Your Path!
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Card 1 */}
        <div className="bg-white w-full sm:w-[250px] p-6 shadow-lg rounded-2xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-purple-200">
          <Sparkles className="text-purple-500 w-12 h-12 mb-4" />
          <p className="text-center text-black font-medium">AI-driven precision</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white w-full sm:w-[250px] p-6 shadow-lg rounded-2xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-purple-200">
          <User className="text-purple-500 w-12 h-12 mb-4" />
          <p className="text-center text-black font-medium">Personalized career guidance</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white w-full sm:w-[250px] p-6 shadow-lg rounded-2xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-purple-200">
          <Send className="text-purple-500 w-12 h-12 mb-4" />
          <p className="text-center text-black font-medium">Empowering users to shape their future</p>
        </div>
      </div>
    </div>
  );
};

export default About;
