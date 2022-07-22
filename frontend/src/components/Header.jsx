import { useState, useEffect, useContext, useRef } from "react";
import AcInfo from "@contexts/AcInfo";
import axios from "@services/axios";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import "@styles/Header.scss";

const Header = (props) => {
  const { setAircraftInfo } = useContext(AcInfo);
  const [aircraftList, setAircraftList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const { onClickOutside } = props;

  const fetchAircrafts = async () => {
    try {
      const aircrafts = await axios
        .get("aircrafts/", { withCredentials: true })
        .then((result) => result.data);
      if (aircrafts.length > 0) {
        return setAircraftList(aircrafts);
      }
      return setAircraftList();
    } catch (err) {
      return alert(err.reponse.data);
    }
  };

  const handleCardClick = (data) => {
    setAircraftInfo(data);
  };

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const handleClickOutside = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      ref2.current &&
      !ref2.current.contains(e.target)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <header className="main-header">
      <NavLink to="/" className="title-site">
        AircraftDB
      </NavLink>
      <div className="searchContainer">
        <input
          ref={ref}
          type="text"
          className="searchBar"
          onFocus={() => setIsFocused(true)}
          placeholder="Search an aircraft ..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && isFocused && (
          <ul className="searchList" ref={ref2}>
            {aircraftList
              .filter((aircraft) => {
                if (aircraft) {
                  const acName = aircraft.name;
                  return (
                    acName.toLowerCase().includes(searchValue.toLowerCase()) ||
                    aircraft.manufacturer.toLowerCase().includes(searchValue) ||
                    aircraft.type
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  );
                }
                return aircraft;
              })
              .map((aircraft) => (
                <li>
                  <NavLink
                    to={`/aircraft/${aircraft.id}`}
                    onClick={() => handleCardClick(aircraft)}
                  >
                    {aircraft.imgLink && (
                      <img
                        className="searchImage"
                        src={`${
                          import.meta.env.VITE_BACKEND_ASSETS
                        }images/aircraft/${aircraft.imgLink}`}
                        alt=""
                      />
                    )}
                    <div className="searchInfoText">
                      <h4>{aircraft.name}</h4>
                      <p>{aircraft.manufacturer}</p>
                    </div>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}
      </div>

      <Navbar />
    </header>
  );
};

export default Header;
