import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { navData } from "../../data/navData";
import {
  HomeIcon,
  InformationCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  PhotoIcon,
  PencilSquareIcon,
  UserMinusIcon,
  UserPlusIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import loginIcon from "../../assets/icons/login.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import dashboardIcon from "../../assets/icons/dashboard.svg";

export default function SidebarNav({ setOpen }) {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  return (
    <nav className="grid grid-col-2 gap-8 sm:grid-col-1 bg-transparent">
      {navData.map((path) => (
        <NavLink
          key={path.name}
          to={path.path}
          className="px-4 sm:px-10 py-2 bg-gradient-to-l from-pink-200 to-pink-400 border-2 border-pink-400 rounded-2xl shadow-neon shadow-pink-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-pink-200/60 hover:border-pink-200"
          onClick={() => setOpen(false)}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800">
            {path.name}
            {path.name === "Home" && (
              <HomeIcon
                className="h-6 w-6 text-rose-600 hidden sm:block"
                aria-hidden="true"
              />
            )}
            {path.name === "About" && (
              <InformationCircleIcon
                className="h-6 w-6 text-rose-600 hidden sm:block"
                aria-hidden="true"
              />
            )}
            {path.name === "Gallery" && (
              <PhotoIcon
                className="h-6 w-6 text-rose-600 hidden sm:block"
                aria-hidden="true"
              />
            )}
            {path.name === "Blog" && (
              <PencilSquareIcon
                className="h-6 w-6 text-rose-600 hidden sm:block"
                aria-hidden="true"
              />
            )}
            {path.name === "Contact" && (
              <ChatBubbleBottomCenterTextIcon
                className="h-6 w-6 text-rose-600 hidden sm:block"
                aria-hidden="true"
              />
            )}
          </div>
        </NavLink>
      ))}
      <div className="col-span-2 sm:col-span-1 border border-pink-200" />

      {!user ? (
        <NavLink
          to="login"
          className="px-4 sm:px-10 py-2 bg-gradient-to-l from-pink-200 to-pink-400 border-2 border-pink-400 rounded-2xl shadow-neon shadow-pink-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-pink-200/60 hover:border-pink-200"
          onClick={() => setOpen(false)}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800">
            Login
            <UserPlusIcon
              className="h-6 w-6 text-rose-600 hidden sm:block"
              aria-hidden="true"
            />
          </div>
        </NavLink>
      ) : (
        <button
          className="px-4 sm:px-10 py-2 bg-gradient-to-l from-pink-200 to-pink-400 border-2 border-pink-400 rounded-2xl shadow-neon shadow-pink-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-pink-200/60 hover:border-pink-200"
          onClick={() => logout()}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800">
            Logout
            <UserMinusIcon
              className="h-6 w-6 text-rose-600 hidden sm:block"
              aria-hidden="true"
            />
          </div>
        </button>
      )}
      {user && user.role === "admin" && (
        <NavLink
          to="dashboard"
          className="px-4 sm:px-10 py-2 bg-gradient-to-l from-pink-200 to-pink-400 border-2 border-pink-400 rounded-2xl shadow-neon shadow-pink-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-pink-200/60 hover:border-pink-200"
          onClick={() => setOpen(false)}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800">
            Dashboard
            <ViewColumnsIcon
              className="h-6 w-6 text-rose-600 hidden sm:block"
              aria-hidden="true"
            />
          </div>
        </NavLink>
      )}
    </nav>
  );
}
