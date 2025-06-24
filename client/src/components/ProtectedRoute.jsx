import { Navigate } from "react-router-dom";
import { UserStore } from "../store/UserStore";

function ProtectedRoute({ children }) {
  const { authUser } = UserStore();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
