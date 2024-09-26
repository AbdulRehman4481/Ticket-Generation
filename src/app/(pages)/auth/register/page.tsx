"use client";
import useRegister from "@/hooks/useRegister";


export default function Register() {
  const {handleChange,state,handleRegister,loading}= useRegister()
 
  return (
    <>
      <div className="bg-primary-gradient bg-cover bg-center bg-no-repeat h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl shadow-lg w-[350px] sm:w-[400px]">
          <h1 className="text-3xl font-bold text-white mb-4">Register</h1>
          <span className="text-lg text-white mb-8">Create your account</span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={state.username}
            onChange={handleChange}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full mb-4 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full mb-4 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Phone No"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full mb-4 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={state.city}
            onChange={handleChange}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full mb-4 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleRegister}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-[100px] w-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105 mb-4"
          >
            {loading ? "Loading..." : "REGISTER"}
          </button>
          <span className="text-sm text-white mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-400 underline">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
