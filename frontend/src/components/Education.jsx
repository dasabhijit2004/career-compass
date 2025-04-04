import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const questions = [
  "I am satisfied with my current level of education.",
  "I believe that further education is essential for career advancement.",
  "I am willing to invest time and money in pursuing higher qualifications.",
  "My current qualifications adequately prepare me for my desired career.",
  "I am interested in online courses and distance learning programs.",
  "I think that vocational training is as valuable as academic qualifications.",
  "I am open to changing my field of study if it aligns better with my career goals.",
  "I believe that continuous learning is necessary to stay competitive in the job market.",
  "I am confident that my current education has provided me with the necessary skills for my career.",
  "I would consider pursuing a graduate degree if it enhances my career prospects.",
  "I think that certifications and professional licenses are important for career advancement.",
  "I am interested in attending workshops and seminars to improve my skills.",
  "I believe that education should be a lifelong process.",
  "I am willing to take on student loans to fund further education if necessary.",
  "I think that my current education has prepared me well for the workforce.",
  "I am interested in mentorship programs to guide my career development.",
  "I believe that formal education is more important than informal learning experiences.",
  "I would consider pursuing education abroad if it offers better opportunities.",
  "I think that self-directed learning is an effective way to acquire new skills.",
  "I am motivated to pursue further education to enhance my personal growth."
];

const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];

const validationSchema = Yup.object().shape({
  answer: Yup.string().required("Please select an option")
});

const Education = () => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setAnswers((prev) => ({ ...prev, [page]: value }));
  };

  return (
    <div className='flex items-center justify-center h-screen p-2'>
      <div className="p-6 bg-white shadow rounded-md max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Education - Question {page + 1}</h2>
        <p className="mb-4">{questions[page]}</p>

        <Formik
          key={page}
          initialValues={{ answer: answers[page] || '' }}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log("Final Answers: ", answers);
            alert("Responses submitted! Check the console for details.");
            navigate('/values');
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

export default Education;
