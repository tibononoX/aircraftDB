import { useState, useEffect } from "react";
import axios from "@services/axios";
import Header from "@components/Header";
import "@styles/Catalog.scss";
import CatalogCarousels from "@components/CatalogCarousels";

const Catalog = ({ setAircraftInfo, aircraftInfo }) => {
  const [aircraftList, setAircraftList] = useState();
  const [typesList, setTypesList] = useState();

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

  const fetchTypes = async () => {
    try {
      const newTypesList = await axios
        .get("aircrafts/types", {
          withCredentials: true,
        })
        .then((result) => result.data);
      if (newTypesList) {
        return setTypesList(newTypesList);
      }
    } catch (err) {
      if (err) {
        return alert(err.response.data);
      }
    }
    return null;
  };

  useEffect(() => {
    fetchAircrafts();
    fetchTypes();
  }, []);

  return (
    <div className="page">
      <Header />
      <section className="catalog-content">
        <header className="info-header">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            suscipit nam delectus ex voluptatum, voluptatibus odio asperiores
            nobis temporibus harum magnam repellat vitae, doloribus quas
            pariatur eum dolore maxime error.
          </p>
        </header>
        <ul className="carousel-list">
          {typesList &&
            typesList.map((type) => (
              <CatalogCarousels
                type={type}
                aircraftList={aircraftList}
                aircraftInfo={aircraftInfo}
                setAircraftInfo={setAircraftInfo}
              />
            ))}
        </ul>
      </section>
    </div>
  );
};

export default Catalog;
