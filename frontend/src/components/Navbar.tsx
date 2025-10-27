import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const Navbar: React.FC = () => {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmDelete = window.confirm('Are you sure you want to logout this user?');
    if (confirmDelete) {
      UserService.logout();
      navigate("/login");
    }

  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">

        <h1 className="text-lg font-semibold">PhaoRuzzyDev</h1>
        {isAuthenticated && (
          <div className="flex space-x-6">
            {isAdmin && (
              <Link
                to="/admin/user-management"
                className="text-white hover:text-blue-400 transition"
              >
                User Management
              </Link>
            )}

            <Link
              to="/auth/profile"
              className="text-white hover:text-blue-400 transition"
            >
              Profile
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
