import Navbar from "./Navbar";
import "@styles/Header.scss";

const Header = () => {
  return (
    <header className="main-header">
      <h1 className="title-site">AircraftDB</h1>
      <Navbar />
    </header>
  );
};

export default Header;
