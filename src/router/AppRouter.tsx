import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, EditPage, LoginPage, NewProduct } from "../pages";
import { useEffect } from "react";
// import { useAuthStore } from "../store/authStore";
import { useCheckAuthStore } from "../hooks/useCheckAuthStore";

export const AppRouter = () => {
   const { status, checkAuthToken } = useCheckAuthStore();
   useEffect(() => {
      checkAuthToken();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   // if (status === "checking") {
   //    return <h3>Loading...</h3>;
   // }

   return (
      <BrowserRouter>
         <Routes>
            {status === "checking" || status === "not-authenticated" ? (
               <>
                  {/* ? CAMBIAR EL ORDEN ? */}
                  <Route path="/*" element={<Navigate to={"/auth/login"} />} />
                  <Route path="/auth/*" element={<LoginPage />} />
               </>
            ) : (
               <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/new" element={<NewProduct />} />
                  <Route path="/edit/:id" element={<EditPage />} />
                  <Route path="/*" element={<Navigate to={"/"} />} />
               </>
            )}
            {/* <Route path="/*" element={<Navigate to={"/"} />} /> */}
         </Routes>
      </BrowserRouter>
   );
};
