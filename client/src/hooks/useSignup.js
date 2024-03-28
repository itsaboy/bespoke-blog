import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [signupError, setSignupError] = useState(null);
  const [signupLoading, setSignupLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (username, email, password) => {
    setSignupLoading(true);
    setSignupError(null);
    const req = "/api/user/signup";
    const res = await fetch(req, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setSignupLoading(false);
      setSignupLoading(data.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user: data, // Explicitly setting the user object
          accessToken: data.accessToken, // Explicitly setting the accessToken
        },
      });
      setSignupLoading(false);
      navigate("/");
    }
  };

  return { signupError, signupLoading, signup };
};
