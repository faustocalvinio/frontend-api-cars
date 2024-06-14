import { useAuthStore } from "../store/authStore";
import { LogoutButton } from "./LogoutButton";

export const Navbar = () => {
   const user = useAuthStore((state) => state.user);

   return (
      <nav className=" flex bg-gray-100 w-screen items-center max-w-screen-2xl px-12 py-2  justify-between mx-auto">
         <h5>{user?.name}</h5>
         <LogoutButton />
      </nav>
   );
};
