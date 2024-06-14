import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../api/config";
import { useEffect } from "react";
import { queryClient } from "../query/client";

export const useCarsData = () => {
   const fetchProjects = () => baseURL.get("/cars/all").then((res) => res.data);

   const { data } = useQuery({
      queryKey: ["cars"],
      queryFn: () => fetchProjects(),
   });

   useEffect(() => {
      queryClient.setQueryData(["cars"], data);
   }, [data]);

   return data;
};
