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
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
        },
      });
      navigate("/");
    } catch (error) {
      setSignupError(error.message);
    } finally {
      setSignupLoading(false);
    }
  };

  return { signupError, signupLoading, signup };
};
