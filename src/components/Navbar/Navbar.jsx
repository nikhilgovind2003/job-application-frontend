import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth/authSlice";
import { Menu, X } from 'lucide-react';
import { useState } from "react";
import "./Navbar.css";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="Logo">
          Logo
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <X /> : <Menu />}
        </div>

        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          {user && <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>}
          {user && <Link to="/create-job" onClick={() => setMenuOpen(false)}>Create Job</Link>}
          {user && <Link to="/my-jobs" onClick={() => setMenuOpen(false)}>My Jobs</Link>}
        
          {user ? (
            <>
              <span className="username">{user.username}</span>
              <button
                className="logout-btn"
                onClick={() => {
                  dispatch(logout());
                  toast.success("Logout successful", {
                    position: "top-right",
                  });
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
