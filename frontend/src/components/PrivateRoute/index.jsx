import { Navigate } from "react-router-dom"
import { isLoggedIn, getUser } from "../../utils/auth"

export default function PrivateRoute({ children, adminOnly = false }) {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />
  }

  if (adminOnly) {
    const user = getUser();
    if (!user || !user.isAdmin) {
      return <Navigate to="/home" replace />
    }
  }

  return children;
}
