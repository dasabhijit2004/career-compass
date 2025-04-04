import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const questions = [
  "I have a clear five-year career progression plan that guides my professional decisions.",
  "Regular promotions and title advancements are essential measures of my career success.",
  "I prioritize gaining diverse skills over rapid advancement within a single specialization.",
  "I believe my current career path will lead to financial security within the next decade.",
  "I am willing to relocate to a different city or country if it significantly advances my career.",
  "I regularly seek feedback from mentors or supervisors about my career development.",
  "I expect to remain in my current industry for the majority of my professional life.",
  "I value work-life balance more than accelerated career advancement.",
  "I actively network with industry professionals to create future career opportunities.",
  "I am confident that my current education and skills will remain relevant throughout my career.",
  "My career goals are aligned with my personal values and life purpose.",
  "I have specific financial milestones (e.g., retirement savings, property ownership) that I am working toward.",
  "I deliberately make career choices that allow me to maintain important personal relationships.",
  "I regularly reassess and adjust my long-term goals based on changing life circumstances.",
  "I prioritize career choices that contribute positively to society over those that maximize personal gain.",
  "I consider the environmental impact of my career and lifestyle choices when planning for the future.",
  "I have defined what 'success' means to me beyond conventional measures like wealth or status.",
  "I am actively working toward achieving work-location independence (ability to work remotely or flexibly).",
  "I have specific personal development goals that exist separately from my professional objectives.",
  "I believe my current path will lead to overall life satisfaction in the long term."
];

const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];

const validationSchema = Yup.object().shape({
  answer: Yup.string().required("Please select an option")
});

const LongTerm = () => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setAnswers((prev) => ({ ...prev, [page]: value }));
  };

  return (
    <div className='flex items-center justify-center h-screen p-2'>
      <div className="p-6 bg-white shadow rounded-md max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Long Term Goals - Question {page + 1}</h2>
        <p className="mb-4">{questions[page]}</p>

        <Formik
          key={page}
          initialValues={{ answer: answers[page] || '' }}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log("Final Answers: ", answers);
            alert("Responses submitted! Check the console for details.");
            navigate('/workenv');
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

export default LongTerm;
