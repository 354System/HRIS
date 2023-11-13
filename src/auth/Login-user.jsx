import React from "react";
import { Link } from "react-router-dom";

const LoginUser = () => {
  return (
    <div className="flex content-center justify-center h-[595px] items-center bg-purple/70">
      <form className="border-4 p-16 border-[#93B1A6] bg-[#5C8374]">
        <h1 className="mb-10 font-bold text-3xl text-center">LOGIN</h1>
        <div className="mb-6">
          <label htmlFor="username" className="text-xl">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[350px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold"
            placeholder="email"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[350px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold"
            placeholder="password"
            required
          ></input>
        </div>
        <Link to={'/user/dashboard'}>
        <button
          type="button"
          className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg "
        >
          Log in
        </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginUser;
