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
    const res = await fetch(req, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setLoginLoading(false);
      setLoginError(data.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user: data,
          accessToken: data.accessToken,
        },
      });
      setLoginLoading(false);
      navigate("/");
    }
  };

  return { loginError, loginLoading, login };
};
