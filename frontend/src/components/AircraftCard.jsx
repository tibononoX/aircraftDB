import "@styles/AircraftCard.scss";
import { NavLink } from "react-router-dom";

const AircraftCard = ({ data, setAircraftInfo }) => {
  const handleCardClick = () => {
    setAircraftInfo(data);
  };
  return (
    data && (
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
    )
  );
};
export default AircraftCard;
