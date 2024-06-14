import { Link } from "react-router-dom";

export const EditItem = ({ id }: { id: string }) => {
   return (
      <Link
         className="font-medium rounded-lg text-sm px-2 py-1 border text-[#0284c7] border-[#0284c7] hover:bg-[#0284c7] hover:text-white"
         to={`/edit/${id}`}
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="20"
            viewBox="0 0 24 24"
         >
            <path
               fill="currentColor"
               d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
            />
         </svg>
      </Link>
   );
};
