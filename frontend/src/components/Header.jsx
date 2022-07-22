import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import "@styles/Header.scss";

const Header = () => {
  return (
    <header className="main-header">
      <NavLink to="/" className="title-site">
        AircraftDB
      </NavLink>
      <Navbar />
    </header>
  );
};

export default Header;
