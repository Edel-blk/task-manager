import { Navigate } from "react-router-dom";
import { useGlobal } from "../context/UseGlobal";

export const ProtectedRoute = ({ children }) => {
  const { userData } = useGlobal();
  if (!userData) {
    return <Navigate to="/" />;
  }
  return children;
};