import { baseURL } from "../api/config";
import { CarData } from "../interfaces/Car.interface";
import { queryClient } from "../query/client";

export const UpdateStock = ({
   id,
   amount,
   less = false,
}: {
   id: string;
   amount: number;
   less?: boolean;
}) => {
   async function updateStockHandler() {
      await baseURL.post(
         `/cars/update/stock/${id}?amount=${amount.toString()}`
      );

      queryClient.setQueryData(["cars"], (oldData: CarData[]) => {
         if (!oldData) return [];

         return oldData.map((car) => {
            if (car._id === id) {
               return { ...car, stock: amount,lastUpdate:Date.now() };
            }
            return car;
         });
      });
   }

   if (less)
      return (
         <button
            onClick={updateStockHandler}
            className="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl  px-4 py-1 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900 disabled:border-red-600 disabled:bg-red-700 disabled:text-white "
            disabled={ amount ===   -1 }
         >
            -
         </button>
      );
   else
      return (
         <button
            onClick={updateStockHandler}
            className="text-blue-600 text-xl inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-1 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
         >
            +
         </button>
      );
};
