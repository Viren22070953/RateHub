import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, KeyRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const roleHome = {
  admin: "/admin/dashboard",
  user: "/user/stores",
  store_owner: "/owner/dashboard",
};

const passwordPath = {
  admin: "/update-password",
  user: "/user/password",
  store_owner: "/owner/password",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "RH";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to={user ? roleHome[user.role] || "/" : "/home"} className="brand">
        <img src="/ratehub-logo.png" alt="RateHub logo" className="brand-logo" />
        <span>RateHub</span>
      </Link>

      <div className="nav-links">
        {!user && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
            <NavLink to="/admin/stores">Stores</NavLink>
            <NavLink to="/admin/users">Users</NavLink>
          </>
        )}

        {user?.role === "user" && (
          <>
            <NavLink to="/user/stores">Stores</NavLink>
            <NavLink to="/user/my-ratings">My Ratings</NavLink>
          </>
        )}

        {user?.role === "store_owner" && (
          <NavLink to="/owner/dashboard">Dashboard</NavLink>
        )}
      </div>

      {user && (
        <div className="profile-menu">
          <button type="button" className="avatar-button" onClick={() => setMenuOpen((open) => !open)}>
            <span className="avatar">{getInitials(user.name)}</span>
            <ChevronDown size={16} />
          </button>

          {menuOpen && (
            <div className="profile-dropdown">
              <div className="profile-meta">
                <strong>{user.name}</strong>
                <span className={`role-badge role-${user.role}`}>{user.role.replace("_", " ")}</span>
              </div>
              <Link to={passwordPath[user.role] || "/update-password"} onClick={() => setMenuOpen(false)}>
                <KeyRound size={16} />
                Update Password
              </Link>
              <button type="button" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
