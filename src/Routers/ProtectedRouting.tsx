import { Navigate } from "react-router-dom";

export default function ProtectedRouting({ children }) {
  if (xxx) {
    return children;
  } else {
    return <Navigate to={"login"} />;
  }
}
