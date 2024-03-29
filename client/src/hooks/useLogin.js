import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (username, password) => {
    setLoginLoading(true);
    setLoginError(null);
    const req = "/api/user/login";
    try {
      const res = await fetch(req, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      dispatch({
        type: "LOGIN",
        payload: {
          user: { username: data.username, role: data.role },
        },
      });

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return { loginError, loginLoading, login };
};
