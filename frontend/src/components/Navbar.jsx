import { useContext } from "react";
import UserContext from "@contexts/UserContext";
import { NavLink } from "react-router-dom";

import "@styles/Navbar.scss";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <ul className="nav-list">
      {user && user.role === "Admin" && (
        <li className="nav-element">
          <NavLink
            className={(nav) =>
              nav.isActive ? "buttonAdmin navActive" : "buttonAdmin"
            }
            to="/admin?tab=users"
          >
            Admin
          </NavLink>
        </li>
      )}
      <li className="nav-element">
        <NavLink className={(nav) => (nav.isActive ? "navActive" : "")} to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-element">
        <NavLink
          className={(nav) => (nav.isActive ? "navActive" : "")}
          to="/catalog"
        >
          Catalog
        </NavLink>
      </li>
      <li className="nav-element">
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noreferrer"
          className={(nav) => (nav.isActive ? "navActive" : "")}
        >
          API
        </a>
      </li>
      <li className="nav-element">
        <NavLink
          className={(nav) => (nav.isActive ? "navActive" : "")}
          to="/contact"
        >
          Contact
        </NavLink>
      </li>
      {!user && (
        <li className="nav-element">
          <NavLink
            className={(nav) => (nav.isActive ? "navActive" : "")}
            to="/signup"
          >
            Sign up
          </NavLink>
        </li>
      )}
      <li className="nav-element">
        {!user ? (
          <NavLink
            className={(nav) => (nav.isActive ? "navActive" : "")}
            to="/login"
          >
            Log in
          </NavLink>
        ) : (
          <NavLink
            className={(nav) => (nav.isActive ? "navActive" : "")}
            to="/logout"
          >
            Log out
          </NavLink>
        )}
      </li>
    </ul>
  );
};

export default Navbar;
