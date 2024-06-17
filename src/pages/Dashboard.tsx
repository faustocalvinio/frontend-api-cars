import { CarItem, Navbar } from "../components";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { baseURL } from "../api/config";
import { Link } from "react-router-dom";
import { queryClient } from "../query/client";
import { CarData } from "../interfaces/Car.interface";

export function Dashboard() {
   // ?fetch debe recibir el page?= seguido del estado
   const fetchProjects = () => baseURL.get("/cars/all").then((res) => res.data);
   const cachedData = queryClient.getQueryData(["cars"]);
   const { data } = useQuery(
      {
         queryKey: ["cars"],
         queryFn: () => fetchProjects(),
         placeholderData: keepPreviousData,
         enabled: !cachedData,
      },
      queryClient
   );

   const onRevalidateData = async () => {
      console.log("revalidar");
   };

   return (
      <>
         <Navbar />
         <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
               <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                  <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                     <div className="flex items-center flex-1 space-x-4">
                        <h5>
                           <span className="text-gray-500">All Products: </span>
                           <span className="dark:text-white">
                              {data?.length}
                           </span>
                        </h5>
                        <h5>
                           <span className="text-gray-500">Total stock: </span>
                           <span className="dark:text-white">$88.4k</span>
                        </h5>
                     </div>
                     <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                        <Link
                           to={`/new`}
                           className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                        >
                           <svg
                              className="h-3.5 w-3.5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                           >
                              <path
                                 clipRule="evenodd"
                                 fillRule="evenodd"
                                 d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              />
                           </svg>
                           Add new product
                        </Link>
                        <button
                           type="button"
                           disabled
                           onClick={() => onRevalidateData()}
                           className="disabled:bg-red-500 disabled:text-white flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                           <svg
                              className="w-4 h-4 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                              />
                           </svg>
                           Update data
                        </button>
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                           <tr>
                              <th scope="col" className="p-4">
                                 <div className="flex items-center">
                                    <input
                                       id="checkbox-all"
                                       type="checkbox"
                                       className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                       htmlFor="checkbox-all"
                                       className="sr-only"
                                    >
                                       checkbox
                                    </label>
                                 </div>
                              </th>
                              <th scope="col" className="px-4 py-3">
                                 Product
                              </th>
                              <th scope="col" className="px-4 py-3">
                                 Category
                              </th>
                              <th scope="col" className="px-4 py-3">
                                 Stock
                              </th>
                              <th scope="col" className="px-4 py-3">
                                 Sales
                              </th>
                              <th scope="col" className="px-4 py-3">
                                 Price
                              </th>
                              <th scope="col" className="px-4 py-3">
                                 Last Update
                              </th>
                              <th scope="col" className="px-4 py-3 text-center">
                                 Actions
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {data?.map((car: CarData) => {
                              return <CarItem key={car._id} car={car} />;
                           })}
                        </tbody>
                     </table>
                  </div>
                  <nav
                     className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                     aria-label="Table navigation"
                  >
                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400 flex gap-2">
                        Showing
                        <span className="font-semibold text-gray-900 dark:text-white">
                           {data?.length}
                        </span>
                        of
                        <span className="font-semibold text-gray-900 dark:text-white">
                           {data?.length}
                        </span>
                     </span>
                  </nav>
               </div>
            </div>
         </section>
      </>
   );
}
