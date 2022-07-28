import { useContext } from "react";
import "@styles/AircraftCard.scss";
import axios from "@services/axios";
import { NavLink } from "react-router-dom";
import UserFav from "@contexts/UserFav";

const AircraftCard = ({ data, setAircraftInfo }) => {
  const { userFav, fetchFavorites } = useContext(UserFav);
  const handleCardClick = () => {
    setAircraftInfo(data);
  };

  const addFavorite = async () => {
    await axios
      .post("favorites/add", { aircraftId: data.id }, { withCredentials: true })
      .then((result) => result.data);
    fetchFavorites();
    return alert("Aircraft added to favorites");
  };

  return (
    data && (
      <div>
        <button type="button" className="addFav" onClick={() => addFavorite()}>
          {userFav.filter((aircraft) => aircraft.id === data.id).length !== 0
            ? "Remove from favorite"
            : "Add to favorite"}
        </button>
        <NavLink
          to={`/aircraft/${data.id}`}
          className="aircraft-card"
          onClick={() => handleCardClick()}
        >
          <div
            className="content"
            style={{
              backgroundImage: `url(${
                import.meta.env.VITE_BACKEND_ASSETS
              }images/aircraft/${data.imgLink})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              backgroundPosition: "center",
            }}
          >
            <div className="top-text">
              <h1 className="title">{data.name}</h1>
              <h2 className="company">by {data.manufacturer}</h2>
            </div>
            <div className="desc">{data.desc.substring(0, 250)} ...</div>
          </div>
        </NavLink>
      </div>
    )
  );
};
export default AircraftCard;
