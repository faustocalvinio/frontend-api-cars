import { useCheckAuthStore } from "../hooks";

export const LogoutButton = () => {
   const { startLogout } = useCheckAuthStore();
   return (
      <button
         onClick={() => startLogout()}
         className="bg-transparent border border-red-600 flex gap-2 px-4 py-1 rounded-lg hover:text-white hover:bg-red-600 transition-all fill-red-600 text-red-600 hover:fill-white"
      >
         <span className="">Logout</span>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
         >
            <path
               fill="currentColor"
               d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
            />
         </svg>
      </button>
   );
};
