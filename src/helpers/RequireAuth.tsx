import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  try {
    // const jwt = localStorage.getItem("jwt");

    const jwt = useSelector((state: RootState) => (state.user.jwt));
    if (!jwt) {
      return <Navigate to="auth/login" replace />;
    }

    return children;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }


  // if (notCorrect) {
  //   return <Navigate to="auth/login" replace />;
  // }

};