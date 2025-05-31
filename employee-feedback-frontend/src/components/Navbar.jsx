import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar({ token }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar bg-primary text-primary-content px-6 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          Employee Feedback
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 font-semibold">
        {token ? (
          <Link to="/admin" className="btn btn-outline btn-secondary">
            Admin Dashboard
          </Link>
        ) : (
          <Link to="/admin/login" className="btn btn-outline btn-secondary">
            Admin Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52 absolute right-6 top-16 z-50">
          {token ? (
            <li>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                Admin Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>
                Admin Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
