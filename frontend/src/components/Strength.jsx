import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const questions = [
  "I can quickly learn and adapt to new software programs and digital tools.",
  "I'm good at explaining complex ideas in ways that are easy to understand.",
  "I can analyze numerical data and draw meaningful conclusions from it.",
  "I excel at resolving conflicts between people or groups.",
  "I can effectively manage my time and meet deadlines consistently.",
  "I'm skilled at persuading others and negotiating favorable outcomes.",
  "I can troubleshoot and solve technical problems methodically.",
  "I'm proficient at writing clear, effective, and error-free content.",
  "I can easily build rapport and develop relationships with diverse people.",
  "I'm good at generating creative solutions to challenging problems.",
  "I can maintain composure and make sound decisions under pressure.",
  "I'm skilled at organizing information and creating structured systems.",
  "I can effectively lead teams and motivate others to achieve goals.",
  "I'm proficient at visual design and creating appealing layouts.",
  "I can identify patterns and connections that others might overlook.",
  "I'm skilled at active listening and understanding others' perspectives.",
  "I can work well with detailed processes that require precision and accuracy.",
  "I'm good at researching information and synthesizing findings effectively.",
  "I can confidently speak in front of groups and deliver presentations.",
  "I'm skilled at planning and executing projects from concept to completion."
];

const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];

const validationSchema = Yup.object().shape({
  answer: Yup.string().required("Please select an option")
});

const WorkEnv = () => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setAnswers((prev) => ({ ...prev, [page]: value }));
  };

  return (
    <div className='flex items-center justify-center h-screen p-2'>
      <div className="p-6 bg-white shadow rounded-md max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Strengths & Weaknesses - Question {page + 1}</h2>
        <p className="mb-4">{questions[page]}</p>

        <Formik
          key={page}
          initialValues={{ answer: answers[page] || '' }}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log("Final Answers: ", answers);
            alert("Responses submitted! Check the console for details.");
            navigate('/education');
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Field
                    type="radio"
                    name="answer"
                    value={option}
                    checked={answers[page] === option}
                    onChange={() => {
                      handleOptionChange(option);
                      setFieldValue("answer", option);
                      if (page < questions.length - 1) {
                        setTimeout(() => setPage(page + 1), 100);
                      }
                    }}
                    className="mr-2"
                  />
                  <label>{option}</label>
                </div>
              ))}

              <div className="flex justify-between mt-4">
                {page > 0 && (
                  <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >Previous</button>
                )}
                {page === questions.length - 1 && (
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >Submit</button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WorkEnv;
