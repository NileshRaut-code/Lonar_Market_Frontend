import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/constantcomponets/Header';
const Error404 = () => {
  const navigate = useNavigate();

  return (
    <>
    <Header/>
    
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
      <p className="text-2xl font-medium text-gray-600 mb-6 mt-4">Page Not Found</p>
      <p className="text-gray-500 mb-8 text-center">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <button 
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go Back Home
      </button>
    </div>
    </>
  )
}

export default Error404