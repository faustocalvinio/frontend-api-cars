import { useEffect, useState } from "react";
import { baseURL } from "../api/config";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../query/client";
import { CarData } from "../interfaces/Car.interface";
import toast from "react-hot-toast";
import { Navbar } from "../components";

export const EditPage = () => {
   const [model, setModel] = useState("");
   const [type, setType] = useState("");
   const [fuelType, setFuelType] = useState("");
   const [price, setPrice] = useState(0);
   const [stock, setStock] = useState(0);
   const [sales, setSales] = useState(0);
   const { id } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      // queryClient.getQueryData(["cars"]).map((car: CarData) => {
      //    if (car._id === id) {
      //       setModel(car.model);
      //       setType(car.type);
      //       setFuelType(car.fuelType);
      //       setPrice(car.price);
      //       setStock(car.stock);
      //       setSales(car.sales);
      //    }
      // });
      const carsData = queryClient.getQueryData<CarData[]>(["cars"]);
      if (carsData) {
         carsData.forEach((car: CarData) => {
            if (car._id === id) {
               setModel(car.model);
               setType(car.type);
               setFuelType(car.fuelType);
               setPrice(car.price);
               setStock(car.stock);
               setSales(car.sales);
            }
         });
      }
   }, [id]);

   const onEditProduct = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         // !fetch
         baseURL.patch(`/cars/update/${id}`, {
            model,
            type,
            fuelType,
            price,
            stock,
            sales,
            lastUpdate: Date.now(),
         });
         queryClient.setQueryData(["cars"], (oldData: CarData[]) => {
            return oldData.map((item) => {
               if (item._id === id) {
                  return {
                     ...item,
                     model,
                     type,
                     fuelType,
                     price,
                     stock,
                     sales,
                     lastUpdate: Date.now(),
                  };
               } else return item;
            });
         });
         toast.success(`${model} editado exitosamente`);
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <main className=" w-full flex flex-col items-center">
         <Navbar />
         {/* <Link
            className="bg-blue-800 cursor-pointer text-white px-2 py-1 absolute z-[60]"
            to="/"
         >
            Home
         </Link> */}

         <div
            id="updateProductModal"
            tabIndex={-1}
            className="w-full flex items-center justify-center"
         >
            <div className="relative p-4 w-full max-w-2xl h-full md:w-[70%]">
               <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                     <h3 className=" font-semibold text-gray-900 dark:text-white">
                        Edit Product
                     </h3>
                     <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg   p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="updateProductModal"
                        onClick={() => navigate("/")}
                     >
                        <svg
                           aria-hidden="true"
                           className="w-5 h-5"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                           ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                     </button>
                  </div>

                  <form onSubmit={onEditProduct}>
                     <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                           <label
                              htmlFor="name"
                              className="block mb-2  font-medium text-gray-900 dark:text-white"
                           >
                              Model
                           </label>
                           <input
                              type="text"
                              name="name"
                              id="name"
                              value={model}
                              onChange={(e) => setModel(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900   rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Ex. Apple iMac 27"
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="type"
                              className="block mb-2   font-medium text-gray-900 dark:text-white"
                           >
                              Type
                           </label>
                           <input
                              type="text"
                              name="type"
                              id="type"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900   rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Ex. Apple"
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="price"
                              className="block mb-2   font-medium text-gray-900 dark:text-white"
                           >
                              Price
                           </label>
                           <input
                              type="number"
                              value={price}
                              onChange={(e) => setPrice(Number(e.target.value))}
                              name="price"
                              id="price"
                              className="bg-gray-50 border border-gray-300 text-gray-900   rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="$299"
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="stock"
                              className="block mb-2   font-medium text-gray-900 dark:text-white"
                           >
                              Stock
                           </label>
                           <input
                              type="number"
                              value={stock}
                              onChange={(e) => setStock(Number(e.target.value))}
                              name="stock"
                              id="stock"
                              className="bg-gray-50 border border-gray-300 text-gray-900   rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="299"
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="sales"
                              className="block mb-2   font-medium text-gray-900 dark:text-white"
                           >
                              Sales
                           </label>
                           <input
                              type="number"
                              value={sales}
                              onChange={(e) => setSales(Number(e.target.value))}
                              name="sales"
                              id="sales"
                              className="bg-gray-50 border border-gray-300 text-gray-900   rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="$299"
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="fuel-type"
                              className="block mb-2   font-medium text-gray-900 dark:text-white"
                           >
                              Fuel Type
                           </label>
                           <select
                              id="fuel-type"
                              className="bg-gray-50 border border-gray-300 text-gray-900   rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              value={fuelType}
                              onChange={(e) => setFuelType(e.target.value)}
                              //   defaultValue={"ELECTRICO"}
                           >
                              <option value={"ELECTRICO"}>ELECTRICO</option>
                              <option value="HIBRIDO ENCHUFABLE">
                                 HIBRIDO ENCHUFABLE
                              </option>
                           </select>
                        </div>
                     </div>
                     <div className="flex items-center space-x-4">
                        <button
                           type="submit"
                           className="text-white bg-green-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg   px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                           Edit product
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </main>
   );
};
