import toast from "react-hot-toast";
import { baseURL } from "../api/config";
import { CarData } from "../interfaces/Car.interface";
import { queryClient } from "../query/client";

export const RemoveItem = ({ id,model }: { id: string, model:string }) => {
   const onDeleteCar = (id: string) => {
      try {
         baseURL.delete("/cars/delete/" + id);
         console.log("delete car");
         queryClient.setQueryData(["cars"], (oldData: CarData[]) => {
            return oldData.filter((project) => project._id !== id);
         });
         toast.success(`${model} deleted successfully`, {
            duration: 2000,
         })
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <button
         className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
         onClick={() => onDeleteCar(id)}
      >
         <svg
            className=" w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
               clipRule="evenodd"
            ></path>
         </svg>
      </button>
   );
};
