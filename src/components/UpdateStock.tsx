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
               return { ...car, stock: amount };
            }
            return car;
         });
      });
   }

   if (less)
      return (
         <button
            onClick={updateStockHandler}
            className="bg-red-700 px-2 text-white"
         >
            -
         </button>
      );
   else
      return (
         <button
            onClick={updateStockHandler}
            className="bg-green-700 px-2 text-white"
         >
            +
         </button>
      );
};
