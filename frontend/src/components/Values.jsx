import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const questions = [
  'Having a flexible work schedule is essential for my quality of life.',
  'I prioritize careers that allow me to directly help improve others\' lives.',
  'Earning a high income is one of my top career priorities.',
  'I value working for an organization whose mission aligns with my personal beliefs.',
  'Having opportunities for continuous learning and growth is crucial to me.',
  'I prefer stability and predictability in my work over variety and change.',
  'Recognition for my contributions and achievements is important to me.',
  'I value being able to work independently with minimal supervision.',
  'Making a positive environmental impact through my work matters to me.',
  'Having opportunities for advancement and increasing responsibility is essential.',
  'I prioritize careers that allow me to be creative and innovative.',
  'Working in a collaborative team environment is important to me.',
  'I value careers that contribute to social justice or address inequality.',
  'Having a clear separation between work and personal life is essential.',
  'I prioritize working for organizations with strong ethical practices.',
  'Having prestige or status associated with my career is important to me.',
  'I value careers that allow me to make independent decisions.',
  'Being able to see tangible results of my work is important to me.',
  'I prioritize workplace cultures that emphasize diversity and inclusion.',
  'Having job security is more important to me than high earning potential.'
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
        <h2 className="text-2xl font-bold mb-4">Values & Ethics - Question {page + 1}</h2>
        <p className="mb-4">{questions[page]}</p>

        <Formik
          key={page}
          initialValues={{ answer: answers[page] || '' }}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log("Final Answers: ", answers);
            alert("Responses submitted! Check the console for details.");
            navigate('/lifestyle');
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
