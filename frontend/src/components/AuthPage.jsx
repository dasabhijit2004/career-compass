import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const signUpValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [animation, setAnimation] = useState('animate-slide-in');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setAnimation('animate-slide-out');
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimation('animate-slide-in');
    }, 300);
  };

  const handleAuth = async (values, { setSubmitting }) => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } else {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
      }
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className={`flex bg-white ${isLogin ? 'rounded-r-xl' : 'rounded-l-xl'} shadow-lg shadow-gray-200 w-11/12 md:w-1/2 transition-transform duration-500 ease-in-out transform ${animation}`}> 
        <div className={`w-1/2 ${isLogin ? 'order-last' : ''} hidden md:block overflow-hidden ${isLogin ? 'rounded-r-xl' : 'rounded-l-xl'}`}>
          <img src="src/assets/image1.jpg" alt="Auth" className="w-full h-full object-cover ${isLogin ? 'rounded-r-xl' : 'rounded-l-xl'}" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-4 animate-pulse">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <Formik key={isLogin ? 'login' : 'signup'} initialValues={{ email: '', password: '', confirmPassword: '' }} {...(isLogin ? { validationSchema: loginValidationSchema } : { validationSchema: signUpValidationSchema })} onSubmit={handleAuth}>
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field name="email" type="email" placeholder="Email" className="w-full p-2 border rounded focus:ring focus:ring-blue-500 focus:outline-none focus:border-blue-500" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="relative">
                  <Field name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="w-full p-2 border rounded focus:ring focus:ring-blue-500 focus:outline-none focus:border-blue-500" />
                  <button 
                    type="button" 
                    className="absolute right-2 top-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                {!isLogin && (
                  <div className="relative">
                    <Field name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="w-full p-2 border rounded focus:ring focus:ring-blue-500 focus:outline-none focus:border-blue-500" />
                    <button 
                      type="button" 
                      className="absolute right-2 top-2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                  </div>
                )}
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700" disabled={isSubmitting}>{isLogin ? 'Login' : 'Sign Up'}</button>
              </Form>
            )}
          </Formik>
          <button onClick={handleGoogleLogin} className="w-full mt-2 bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">Login with Google</button>
          <p className="text-center mt-4">{isLogin ? "Don't have an account?" : 'Already have an account?'} <button onClick={toggleAuthMode} className="text-indigo-600 underline">{isLogin ? 'Sign Up' : 'Login'}</button></p>
        </div>
      </div>
    </div>
  );
}