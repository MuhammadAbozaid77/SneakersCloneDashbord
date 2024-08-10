import { Navigate } from "react-router-dom";

export default function ProtectedRouting({ children }) {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    return children;
  } else {
    return <Navigate to={"login"} />;
  }
}
