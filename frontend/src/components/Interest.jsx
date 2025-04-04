import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const interestQuestions = [
  {
    question: "I prefer working independently rather than in a team.",
    short: "Prefer independent work.",
  },
  {
    question: "I enjoy interacting with new people and networking.",
    short: "Enjoy networking.",
  },
  {
    question: "I thrive in structured and organized environments.",
    short: "Prefer structured environments.",
  },
  {
    question: "I am comfortable taking risks in my career decisions.",
    short: "Comfortable with career risks.",
  },
  {
    question:
      "I often rely on logic rather than emotions when making decisions.",
    short: "Logical decision-maker.",
  },
  {
    question:
      "I feel energized when engaging in creative or abstract thinking.",
    short: "Enjoy creative thinking.",
  },
  {
    question: "I enjoy working in predictable and routine-based environments.",
    short: "Prefer routine work.",
  },
  {
    question:
      "I prefer deep, focused work rather than handling multiple tasks at once.",
    short: "Prefer deep focus over multitasking.",
  },
  {
    question:
      "I am highly adaptable and can easily switch between different tasks.",
    short: "Highly adaptable.",
  },
  {
    question:
      "I prefer planning everything in advance rather than going with the flow.",
    short: "Prefer advance planning.",
  },

  {
    question: "I enjoy working in high-pressure, fast-paced environments.",
    short: "Enjoy high-pressure environments.",
  },
  {
    question: "I prefer jobs that require frequent travel.",
    short: "Prefer jobs with travel.",
  },
  {
    question: "I enjoy working in an office rather than remotely.",
    short: "Prefer office work.",
  },
  {
    question: "I thrive in collaborative environments where teamwork is key.",
    short: "Enjoy teamwork.",
  },
  {
    question:
      "I prefer jobs with flexible working hours over strict 9-to-5 schedules.",
    short: "Prefer flexible hours.",
  },
  {
    question:
      "I feel comfortable working in hierarchical, corporate structures.",
    short: "Comfortable in corporate structures.",
  },
  {
    question: "I would enjoy working in startups or entrepreneurial ventures.",
    short: "Interested in startups.",
  },
  {
    question:
      "I value job security over the excitement of unpredictable opportunities.",
    short: "Prefer job security.",
  },
  {
    question:
      "I prefer a career where I can work outdoors rather than indoors.",
    short: "Prefer outdoor work.",
  },
  {
    question: "I would enjoy a job that requires hands-on physical work.",
    short: "Enjoy hands-on work.",
  },

  {
    question: "I am interested in working in healthcare and medicine.",
    short: "Interested in healthcare.",
  },
  {
    question:
      "I am passionate about finance, economics, and investment strategies.",
    short: "Passionate about finance.",
  },
  {
    question:
      "I am drawn to the technology industry (coding, AI, cybersecurity, etc.).",
    short: "Interested in tech.",
  },
  {
    question:
      "I would love to work in the education sector (teaching, research, mentoring).",
    short: "Interested in education.",
  },
  {
    question:
      "I am interested in working in media and entertainment (film, music, writing).",
    short: "Interested in media.",
  },
  {
    question:
      "I enjoy designing physical products, spaces, or user experiences.",
    short: "Enjoy designing products/spaces.",
  },
  {
    question: "I would be happy working in the government or public sector.",
    short: "Interested in public sector.",
  },
  {
    question:
      "I would prefer working in the legal industry (law, policy, justice).",
    short: "Interested in law.",
  },
  {
    question: "I am interested in environmental science and sustainability.",
    short: "Interested in sustainability.",
  },
  {
    question: "I would enjoy working in marketing, advertising, or sales.",
    short: "Interested in marketing.",
  },
  {
    question:
      "I am passionate about psychology and understanding human behavior.",
    short: "Passionate about psychology.",
  },
  {
    question:
      "I would enjoy working in data science, statistics, or analytics.",
    short: "Interested in data science.",
  },
  {
    question:
      "I am interested in business strategy, consulting, and corporate leadership.",
    short: "Interested in business strategy.",
  },
  {
    question: "I would love to work in hospitality, travel, and tourism.",
    short: "Interested in hospitality.",
  },
  {
    question:
      "I enjoy working in engineering and developing technical solutions.",
    short: "Interested in engineering.",
  },

  {
    question:
      "I enjoy programming and problem-solving in software development.",
    short: "Enjoy programming.",
  },
  {
    question: "I have strong numerical and analytical abilities.",
    short: "Strong numerical skills.",
  },
  {
    question:
      "I am skilled at designing and creating artistic or visual content.",
    short: "Skilled in artistic design.",
  },
  {
    question: "I have a knack for writing and communication.",
    short: "Strong writing skills.",
  },
  {
    question: "I enjoy working with mechanical or electrical systems.",
    short: "Interested in mechanical/electrical work.",
  },
  {
    question: "I am proficient in using data analysis tools and methodologies.",
    short: "Proficient in data analysis.",
  },
  {
    question: "I can troubleshoot and resolve technical issues efficiently.",
    short: "Good at troubleshooting.",
  },
  {
    question: "I am skilled at conducting research and synthesizing findings.",
    short: "Skilled in research.",
  },
  {
    question: "I can create compelling marketing and branding strategies.",
    short: "Skilled in marketing strategies.",
  },
  {
    question:
      "I have experience with project management tools and methodologies.",
    short: "Experienced in project management.",
  },

  {
    question: "I am good at persuading and negotiating with others.",
    short: "Skilled in negotiation.",
  },
  {
    question:
      "I can manage my time effectively and meet deadlines consistently.",
    short: "Strong time management.",
  },
  {
    question: "I am skilled at resolving conflicts in professional settings.",
    short: "Good at conflict resolution.",
  },
  {
    question: "I have excellent leadership and team management abilities.",
    short: "Strong leadership skills.",
  },
  {
    question:
      "I am great at actively listening and understanding different perspectives.",
    short: "Good at active listening.",
  },
  {
    question: "I enjoy mentoring or teaching others.",
    short: "Enjoy mentoring/teaching.",
  },
  {
    question:
      "I can maintain composure and make sound decisions under pressure.",
    short: "Calm under pressure.",
  },
  {
    question: "I am skilled at generating innovative solutions to problems.",
    short: "Good at problem-solving.",
  },
  {
    question:
      "I have strong emotional intelligence and can manage relationships well.",
    short: "Strong emotional intelligence.",
  },

  {
    question: "I prioritize having a high salary over job satisfaction.",
    short: "Prioritize high salary.",
  },
  {
    question:
      "I want a career that allows me to make a meaningful impact on society.",
    short: "Seek meaningful impact.",
  },
  {
    question: "I value continuous learning and professional growth.",
    short: "Value continuous learning.",
  },
  {
    question:
      "I prefer a job that offers a work-life balance over career advancement.",
    short: "Prioritize work-life balance.",
  },
  {
    question:
      "I want a career that allows me to be highly creative and innovative.",
    short: "Prefer creative career.",
  },
  {
    question:
      "I prioritize working in an industry that aligns with my personal values.",
    short: "Prefer value-aligned work.",
  },
];

const workStyleOptions = [
  "Independent",
  "Analytical",
  "Outgoing",
  "Methodical",
  "Decisive",
  "Curious",
  "Practical",
  "Observant",
  "Visionary",
  "Structured",
  "Adaptable",
  "Social",
  "Introverted",
  "Logical",
  "Empathetic",
  "Multitasker",
  "Leader",
  "Direct",
  "Competitive",
  "Collaborative",
];

const options = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const Interest = () => {
  const user = auth.currentUser;
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isWorkStylePhase = page >= interestQuestions.length;
  const MAX_WORK_STYLES = 5;

  const handleOptionChange = (value) => {
    if (isWorkStylePhase) {
      setAnswers((prev) => {
        const current = prev.workStyles || [];
        if (current.includes(value)) {
          return {
            ...prev,
            workStyles: current.filter((v) => v !== value),
          };
        } else if (current.length < MAX_WORK_STYLES) {
          return { ...prev, workStyles: [...current, value] };
        }
        return prev;
      });
    } else {
      setAnswers((prev) => ({
        ...prev,
        [interestQuestions[page].short]: options.indexOf(value) + 1,
      }));
      // Auto-advance to next question
      setTimeout(() => setPage((prev) => prev + 1), 200);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if ((answers.workStyles || []).length < MAX_WORK_STYLES) {
      toast.error(`Select exactly ${MAX_WORK_STYLES} work styles.`);
      return;
    }

    const choicesString = Object.entries(answers)
      .map(([key, value]) =>
        key === "workStyles" ? `Work Styles: ${value.join(", ")}` : `${key}: ${value}`
      )
      .join(", ");

    try {
      setLoading(true); // start loading
      const response = await axios.post("https://career-compass-79i1.onrender.com/api/career-suggestions", {
        choices: choicesString,
      });

      localStorage.setItem("suggestions", response.data.suggestions.content);
      toast.success("Responses submitted! Redirecting...");
      navigate("/result");
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {isWorkStylePhase
            ? "Work Style Preferences"
            : `Question ${page + 1} of ${interestQuestions.length}`}
        </h2>

        {!isWorkStylePhase ? (
          <>
            <p className="mb-4 text-gray-700">{interestQuestions[page].question}</p>
            <div className="space-y-2">
              {options.map((option) => (
                <label key={option} className="block cursor-pointer">
                  <input
                    type="radio"
                    name={`answer-${page}`}
                    value={option}
                    checked={
                      options[answers[interestQuestions[page].short] - 1] === option
                    }
                    onChange={() => handleOptionChange(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            {page > 0 && (
              <button
                onClick={handlePrevious}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Previous
              </button>
            )}
          </>
        ) : (
          <>
            <p className="mb-4 text-gray-700">
              Select up to 5 work styles that best describe you:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {workStyleOptions.map((style) => (
                <label
                  key={style}
                  className={`border rounded p-2 text-center cursor-pointer ${(answers.workStyles || []).includes(style)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                    }`}
                  onClick={() => handleOptionChange(style)}
                >
                  {style}
                </label>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Selected: {(answers.workStyles || []).join(", ")}
            </p>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Loading Answers..." : "Submit"}
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Interest;






