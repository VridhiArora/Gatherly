import { Navigate } from "react-router-dom"
import { isLoggedIn } from "../../utils/auth"

// Wraps any route that requires the user to be logged in.
// If no valid token exists → redirect to login page.
// If token is valid → render the page normally.
export default function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" replace />
}
