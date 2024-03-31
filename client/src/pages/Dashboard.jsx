import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import DashboardActions from "../components/Dashboard/DashboardActions";
import NewBlog from "../components/Dashboard/NewBlog";
import NewImage from "../components/Dashboard/NewImage";
import NewContact from "../components/Dashboard/NewContact";
import ChangeHome from "../components/Dashboard/ChangeHome";
import ChangeAbout from "../components/Dashboard/ChangeAbout";
import ChangeGallery from "../components/Dashboard/ChangeGallery";
import ChangeBlog from "../components/Dashboard/ChangeBlog";
import DeleteContact from "../components/Dashboard/DeleteContact";
import DeleteBlog from "../components/Dashboard/DeleteBlog";
import DeleteImage from "../components/Dashboard/DeleteImage";
import logoutIcon from "../assets/icons/logout.svg";

export default function Dashboard() {
  const [newAction, setNewAction] = useState(null);
  const [open, setOpen] = useState(false);

  const { user } = useAuthContext();

  const { logout } = useLogout();

  return (
    <>
      {user && user.role === "admin" ? (
        <div className="pt-32 px-4 overflow-hidden sm:pt-40 pb-24 max-w-6xl mx-auto">
          <DashboardActions newAction={newAction} setNewAction={setNewAction} />
          <div className="my-16 mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-rose-600 to-rose-800 border-l-2 border-rose-500 shadow-neon shadow-rose-500/60">
            {newAction === "new blog" ? (
              <NewBlog />
            ) : newAction === "new image" ? (
              <NewImage />
            ) : newAction === "delete blog" ? (
              <DeleteBlog open={open} setOpen={setOpen} />
            ) : newAction === "delete image" ? (
              <DeleteImage open={open} setOpen={setOpen} />
            ) : newAction === "change home" ? (
              <ChangeHome />
            ) : newAction === "change about" ? (
              <ChangeAbout />
            ) : newAction === "change gallery" ? (
              <ChangeGallery />
            ) : newAction === "change blog" ? (
              <ChangeBlog />
            ) : newAction === "add contact" ? (
              <NewContact />
            ) : newAction === "delete contact" ? (
              <DeleteContact open={open} setOpen={setOpen} />
            ) : null}
          </div>
          <div className="mt-8 flex justify-center items-center">
            <button
              className="px-4 sm:px-10 py-2 bg-gradient-to-l from-pink-200 to-pink-400 border-2 border-pink-400 rounded-2xl shadow-neon shadow-pink-400/60 hover:bg-gradient-to-r hover:shadow-neon hover:shadow-pink-200/60 hover:border-pink-200"
              onClick={() => logout()}
            >
              <div className="flex justify-between items-center text-sm sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800">
                Logout
                <UserMinusIcon className="h-6 w-6 text-rose-800 hidden sm:block" />
              </div>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
