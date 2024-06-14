import { baseURL } from "../api/config";
import { useAuthStore } from "../store/authStore";

export const useCheckAuthStore = () => {
   const user = useAuthStore((state) => state.user);
   const status = useAuthStore((state) => state.status);
   const errorMessage = useAuthStore((state) => state.errorMessage);
   // const dispatch = useDispatch();
   const setStatus = useAuthStore((state) => state.setStatus);
   const setUser = useAuthStore((state) => state.setUser);
   const startLogin = async ({
      email,
      password,
   }: {
      email: string;
      password: string;
   }) => {
      setUser({});
      setStatus("checking");
      try {
         const { data } = await baseURL.post("/auth/login", { email, password });
         console.log(data);

         localStorage.setItem("token", data.token);
         localStorage.setItem(
            "token-init-date",
            new Date().getTime().toString()
         );

         setStatus("authenticated");
         setUser({ name: data.name });
      } catch (error) {
         setStatus("not-authenticated");
         setUser({});
      }
   };

   const checkAuthToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
         setStatus("not-authenticated");
         setUser({});
      }
      try {
         const { data } = await baseURL.get("/auth/renew");
         localStorage.setItem("token", data.token);
         localStorage.setItem(
            "token-init-date",
            new Date().getTime().toString()
         );
         console.log(data);
         setStatus("authenticated");
         setUser({ name: data.name });
      } catch (error) {
         localStorage.clear();
         setStatus("not-authenticated");
         setUser({});
      }
   };
   const startLogout = () => {
      localStorage.clear();
      setStatus("not-authenticated");
      setUser({});
   };

   return {
      errorMessage,
      status,
      user,

      checkAuthToken,
      startLogin,
      startLogout,
      //   startRegister,
   };
};
