import React from 'react'
import { useNavigate } from 'react-router-dom'

const InvalidToken = () => {
    const navigate = useNavigate();
  return (
    <div>   <div className="w-full h-screen flex items-center justify-center">
    <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Oops! Something Went Wrong</h2>
        <p className="text-lg text-gray-600 mb-6">
            It seems your password reset link has expired or is no longer valid. Please request a new one to proceed.
        </p>
        <button
            onClick={() => navigate("/auth/forgot-password")}
            className="py-3 px-6 bg-primary text-white rounded-md text-lg hover:bg-primary-dark transition duration-300"
        >
            Request a New Reset Link
        </button>
        <div className="mt-4">
            <p className="text-sm text-gray-500">Already have an account?</p>
            <button
                onClick={() => navigate("/auth/login")}
                className="text-primary font-medium hover:underline"
            >
                Login Here
            </button>
        </div>
    </div>
</div></div>
  )
}

export default InvalidToken