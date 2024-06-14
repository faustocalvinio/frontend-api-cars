import { useState } from "react";
import { useCheckAuthStore } from "../hooks";
// import toast from "react-hot-toast";

export const LoginPage = () => {
   const { startLogin } = useCheckAuthStore();
   const [emailInput, setEmailInput] = useState("admin1@test.com");
   const [passwordInput, setPasswordInput] = useState("123456");

   const onLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (emailInput.trim() !== "" && passwordInput.trim() !== "") {
         const res = startLogin({
            email: emailInput,
            password: passwordInput,
         }).then((res) => res);

         await console.log(res);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
         <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
               Welcome Back!
            </h1>
            <form onSubmit={(e) => onLoginHandler(e)}>
               <div className="mb-4">
                  <label
                     htmlFor="email"
                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                     Email Address
                  </label>
                  <input
                     type="email"
                     id="email"
                     value={emailInput}
                     onChange={(e) => setEmailInput(e.target.value)}
                     className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="your@email.com"
                     required
                  />
               </div>
               <div className="mb-4">
                  <label
                     htmlFor="password"
                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     value={passwordInput}
                     onChange={(e) => setPasswordInput(e.target.value)}
                     className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="Enter your password"
                     required
                  />
                  <a
                     href="#"
                     className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                     Forgot Password?
                  </a>
               </div>               
               <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               >
                  Login
               </button>
            </form>
         </div>
      </div>
   );
};
