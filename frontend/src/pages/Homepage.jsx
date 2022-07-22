import { useState, useEffect } from "react";
import axios from "@services/axios";
import { NavLink } from "react-router-dom";
import Header from "@components/Header";
import "@styles/Homepage.scss";
import SwiperCarousel from "@components/SwiperCarousel";

const Homepage = ({ setAircraftInfo, aircraftInfo }) => {
  const [aircraftList, setAircraftList] = useState();
  const [userCount, setUserCount] = useState();

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

  const fetchUserNumber = async () => {
    try {
      const userLength = await axios
        .get("users/userNumber", { withCredentials: true })
        .then((result) => result.data);
      if (userLength) {
        return setUserCount(userLength);
      }
      return setAircraftList();
    } catch (err) {
      return alert(err.reponse.data);
    }
  };

  useEffect(() => {
    fetchAircrafts();
    fetchUserNumber();
  }, []);

  return (
    <div className="page">
      <Header />
      <section className="home-content">
        <div className="server-info">
          <h2>
            {aircraftList ? aircraftList.length : "..."} aircraft
            {aircraftList && aircraftList.length <= 1 ? "" : "s"} on the
            database
          </h2>
          <h2>
            {userCount ? userCount.userNumber : "..."} user
            {userCount && userCount.userNumber <= 1 ? "" : "s"} registered
          </h2>
        </div>
        <header className="info-header">
          <div className="project-desc">
            <h2>About the project</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
              neque quae minima, facilis incidunt ex necessitatibus, dignissimos
              modi blanditiis perspiciatis accusamus tempora nihil vitae.
              Blanditiis est corporis sequi dicta deleniti. Distinctio quasi at,
              pariatur nostrum aperiam ut voluptate excepturi laudantium
              corrupti veritatis sit id reiciendis dignissimos. Atque placeat
              quibusdam voluptatum consequuntur quos ab quia enim veritatis
              eius, autem adipisci error! Cum iusto officiis architecto, maxime
              harum fuga odit assumenda corporis, esse, ipsam dicta. Quasi
              delectus, nesciunt cupiditate maiores odio quidem laudantium
              sapiente voluptatibus aperiam molestiae quaerat veniam deleniti
              incidunt et.
            </p>
          </div>
        </header>
        <div className="browse-buttons">
          <NavLink className="button" to="/catalog">
            BROWSE AIRCRAFT LIST
          </NavLink>
          <NavLink to="/catalog">I'd rather get surprised!</NavLink>
        </div>
        <section className="aircraft-carousel">
          <h1>Some random aircrafts ...</h1>
          <SwiperCarousel
            aircraftList={aircraftList}
            aircraftInfo={aircraftInfo}
            setAircraftInfo={setAircraftInfo}
          />
        </section>
      </section>
    </div>
  );
};

export default Homepage;
