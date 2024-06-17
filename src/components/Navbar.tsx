import { useAuthStore } from "../store/authStore";
import { LogoutButton } from "./LogoutButton";

export const Navbar = () => {
   const user = useAuthStore((state) => state.user);

   return (
      <nav className=" flex bg-gray-100 w-full items-center py-2  justify-between mx-auto">
         <div className="flex justify-between mx-auto items-center w-[70%]">
            <h5 className="italic text-green-950 ">User: {user?.name}</h5>
            <LogoutButton />
         </div>
      </nav>
   );
};
