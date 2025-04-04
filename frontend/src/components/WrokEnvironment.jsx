import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const questions = [
  "I prefer working in a quiet, distraction-free environment.",
  "I thrive in fast-paced work environments with tight deadlines.",
  "I prefer a workplace with a clear hierarchical structure.",
  "I enjoy working in an environment where I can frequently interact with different people.",
  "I prefer having my own dedicated workspace rather than shared or flexible seating.",
  "I thrive in organizations with a competitive culture.",
  "I prefer working outdoors or in environments connected to nature.",
  "I enjoy workplaces that encourage creative expression and unconventional thinking.",
  "I prefer organizations with a formal dress code and professional atmosphere.",
  "I thrive in environments where I can work remotely or from different locations.",
  "I prefer workplaces with regular, predictable hours.",
  "I enjoy organizations that celebrate team achievements and milestones.",
  "I prefer environments where I can physically move around during the workday.",
  "I thrive in workplaces with a strong emphasis on work-life balance.",
  "I prefer organizations with flat hierarchies where everyone's input is valued equally.",
  "I enjoy working in environments with frequent change and new challenges.",
  "I prefer a workplace with clear boundaries between different departments or teams.",
  "I thrive in organizations that emphasize collaboration over individual achievement.",
  "I prefer environments where I can listen to music or background noise while working.",
  "I enjoy workplaces that embrace new technologies and digital transformation."
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
        <h2 className="text-2xl font-bold mb-4">Work Environment Preferences - Question {page + 1}</h2>
        <p className="mb-4">{questions[page]}</p>

        <Formik
          key={page}
          initialValues={{ answer: answers[page] || '' }}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log("Final Answers: ", answers);
            alert("Responses submitted! Check the console for details.");
            navigate('/workstyle');
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
