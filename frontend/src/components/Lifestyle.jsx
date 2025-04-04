import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const questions = [
  "I would be willing to relocate to a different city for better career opportunities.",
  "Living in an area with a high cost of living is acceptable to me if it means better job prospects.",
  "I prefer living in urban areas over rural settings.",
  "Proximity to family and friends is a crucial factor in my decision about where to live.",
  "Climate conditions (temperature, precipitation, seasonal changes) significantly impact my quality of life.",
  "I prefer a work environment that allows me to set my own schedule.",
  "The ability to work remotely is essential for my work-life balance.",
  "I am comfortable with last-minute changes to my work responsibilities or schedule.",
  "I value having the freedom to take time off when needed, even if it means less predictable income.",
  "I prefer jobs that allow for career advancement opportunities over those that offer flexibility.",
  "I am willing to work more than 40 hours per week to advance my career.",
  "Having weekends free from work obligations is important to me.",
  "I am comfortable with a job that requires me to be on call outside of regular working hours.",
  "I prefer a consistent, predictable work schedule over a variable one.",
  "I would sacrifice some personal time for a job that offers higher compensation.",
  "My family responsibilities significantly influence my career choices.",
  "I prioritize jobs that align with my personal values, even if they offer lower compensation.",
  "My health conditions or physical limitations affect my lifestyle and work choices.",
  "I am willing to take financial risks (such as starting a business) to pursue my passions.",
  "Having time for hobbies and personal interests is more important to me than career advancement."
];

const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];

const validationSchema = Yup.object().shape({
  answer: Yup.string().required("Please select an option")
});

const Lifestyle = () => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setAnswers((prev) => ({ ...prev, [page]: value }));
  };

  return (
    <div className='flex items-center justify-center h-screen p-2'>
      <div className="p-6 bg-white shadow rounded-md max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Lifestyle - Question {page + 1}</h2>
        <p className="mb-4">{questions[page]}</p>

        <Formik
          key={page}
          initialValues={{ answer: answers[page] || '' }}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log("Final Answers: ", answers);
            alert("Responses submitted! Check the console for details.");
            navigate('/longterm');
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

export default Lifestyle;
