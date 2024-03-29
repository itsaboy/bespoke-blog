import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch("/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { logout };
};
