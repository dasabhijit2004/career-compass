import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

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

const validationSchema = Yup.object().shape({
  answer: Yup.string().required("Please select an option"),
});

const Interest = () => {
  try {
    const user = auth.currentUser;
    if (user!=null) {
      
      const [page, setPage] = useState(0);
      const [answers, setAnswers] = useState({});
      const navigate = useNavigate();
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
            return prev; // Don't allow more than MAX_WORK_STYLES
          });
        } else {
          setAnswers((prev) => ({
            ...prev,
            [interestQuestions[page].short]: options.indexOf(value) + 1,
          }));
        }
      };

      const handleSubmit = async () => {
        // console.log("Final Answers: ", answers);
        var choicesString = Object.entries(answers)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        console.log("Choices: ", choicesString);
        try {
          const response = await axios.post(
            "http://localhost:8080/api/career-suggestions",
            { choices: choicesString }
          );
          console.log("Response: ", response.data.suggestions.content);
          console.log(typeof response.data.suggestions.content);

          localStorage.setItem(
            "suggestions",
            response.data.suggestions.content
          );
        } catch (error) {
          console.log("Error: ", error);
        }
        // console.log(typeof choicesString);

        toast.success("Responses submitted! Redirecting...");

        navigate("/result");
      };

      return (
        <div className="flex items-center justify-center min-h-screen p-2 bg-gray-100">
          <div className="p-6 bg-white shadow rounded-md max-w-xl w-full">
            <h2 className="text-2xl font-bold mb-4">
              {isWorkStylePhase
                ? "Work Style Preferences"
                : `Passion & Interests - Question ${page + 1}/${
                    interestQuestions.length
                  }`}
            </h2>

            {!isWorkStylePhase ? (
              <p className="mb-4">{interestQuestions[page].question}</p>
            ) : (
              <p className="mb-4">
                How would you describe your preferred way of working, thinking,
                and interacting with others?
              </p>
            )}

            <Formik
              key={
                isWorkStylePhase ? "workStyle" : interestQuestions[page].short
              }
              initialValues={{ answer: "" }}
              validationSchema={isWorkStylePhase ? null : validationSchema}
              onSubmit={() => {
                if (!isWorkStylePhase && page < interestQuestions.length - 1) {
                  setPage(page + 1);
                } else {
                  handleSubmit();
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  {!isWorkStylePhase ? (
                    options.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Field
                          type="radio"
                          name="answer"
                          value={option}
                          checked={
                            answers[interestQuestions[page]?.short] ===
                            options.indexOf(option) + 1
                          }
                          onChange={() => {
                            handleOptionChange(option);
                            setFieldValue("answer", option);
                            setTimeout(() => setPage(page + 1), 100);
                          }}
                          className="mr-2"
                        />
                        <label>{option}</label>
                      </div>
                    ))
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {workStyleOptions.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-200 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            id={option}
                            value={option}
                            onChange={(e) => handleOptionChange(e.target.value)}
                            checked={answers.workStyles?.includes(option)}
                            className="mr-2"
                          />
                          <label htmlFor={option} className="text-lg">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between mt-4">
                    {page > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            isWorkStylePhase &&
                            page === interestQuestions.length
                          ) {
                            setPage(interestQuestions.length - 1);
                          } else {
                            setPage(page - 1);
                          }
                        }}
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                      >
                        Previous
                      </button>
                    )}

                    {isWorkStylePhase ? (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        disabled={
                          !answers.workStyles || answers.workStyles.length === 0
                        }
                      >
                        Submit
                      </button>
                    ) : null}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      );
      console.log("hi");
    } else {
      console.log("hello");
    }
  } catch (error) {
    console.log(error);
  }
};

export default Interest;
