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
          <NavLink to="/admin?tab=users">Admin</NavLink>
        </li>
      )}
      <li className="nav-element">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="nav-element">
        <NavLink to="/catalog">Catalog</NavLink>
      </li>
      <li className="nav-element">
        <NavLink to="/api">API</NavLink>
      </li>
      <li className="nav-element">
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {!user && (
        <li className="nav-element">
          <NavLink to="/signup">Sign up</NavLink>
        </li>
      )}
      <li className="nav-element">
        {!user ? (
          <NavLink to="/login">Log in</NavLink>
        ) : (
          <NavLink to="/logout">Log out</NavLink>
        )}
      </li>
    </ul>
  );
};

export default Navbar;
