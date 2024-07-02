import { useEffect, useState } from "react";
import { UpdateStock } from "./UpdateStock";

export const CarStock = ({ stock, id }: { stock: number; id: string }) => {
   const [colour, setColour] = useState("bg-red-700");
   useEffect(() => {
      switch (true) {
         case stock === 0:
            setColour("bg-red-600") 
            break;

         case stock <= 10:
            setColour("bg-orange-600");
            break;
         case stock > 10 && stock <= 25:
            setColour("bg-orange-400");
            break;
         case stock > 25 && stock <= 50:
            setColour("bg-yellow-500");
            break;
         case stock > 50:
            setColour("bg-green-500");
            break;
         default:
            setColour("bg-red-700"); // valor por defecto si no se cumple ninguna condición
      }
   }, [stock]);

   return (
      <>
         <div
            className={`inline-block w-4 h-4 mr-2 ${colour} rounded-full`}
         ></div>
         <UpdateStock id={id} amount={stock + 1} />
         {stock}
         <UpdateStock id={id} amount={stock - 1} less />
      </>
   );
};
