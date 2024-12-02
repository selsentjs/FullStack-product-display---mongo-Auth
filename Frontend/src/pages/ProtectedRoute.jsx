import PropTypes from 'prop-types';  // Import PropTypes
import { Navigate } from 'react-router-dom';

// Create the Route Guard Component for Role-based routing
const ProtectedRoute = ({ role, children }) => {
  const storedRole = localStorage.getItem("role");

  // If no role in localStorage or role doesn't match the required role
  if (!storedRole) {
    return <Navigate to="/login" />;  // Redirect to login if no role is found
  }

  if (storedRole !== role) {
    return <Navigate to="/login" />;  // Redirect to login if role doesn't match
  }

  // If the role matches, return the children (protected route content)
  return children;
};

// Add PropTypes for validation
ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired,  
  children: PropTypes.node.isRequired, 
};

export default ProtectedRoute;
