import { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "@services/axios";
import "@styles/Card.scss";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Card = ({
  type,
  data,
  fetchAircrafts,
  fetchAircraftById,
  fetchUsers,
  fetchUserById,
  fetchManufacturers,
  fetchTypes,
  fetchManufacturerById,
  fetchTypeById,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  const deleteContent = async (contentType, id) => {
    if (
      window.confirm(`Are you sure you want to delete ${contentType} ${id}?`)
    ) {
      await axios.delete(`${contentType}s/${id}`, { withCredentials: true });
      if (type === "user") {
        return fetchUsers();
      }
      if (type === "aircraft") {
        fetchAircraftById(id);
        fetchAircrafts();
        return navigate("?tab=aircrafts&edit=newAircraft");
      }
      if (type === "manufacturer") {
        fetchManufacturers();
        return navigate("?tab=manufacturers&edit=newManufacturer");
      }
      fetchTypes();
      return navigate("?tab=types&edit=newType");
    }
    return null;
  };

  const deleteManufacturer = async (id) => {
    if (window.confirm(`Are you sure you want to delete manufacturer ${id}?`)) {
      await axios.delete(`aircrafts/manufacturers/${id}`, {
        withCredentials: true,
      });

      fetchManufacturers();
      return navigate("?tab=manufacturers&edit=newManufacturer");
    }
    return null;
  };

  const deleteType = async (id) => {
    if (window.confirm(`Are you sure you want to delete type ${id}?`)) {
      await axios.delete(`aircrafts/types/${id}`, {
        withCredentials: true,
      });

      fetchTypes();
      return navigate("?tab=types&edit=newType");
    }
    return null;
  };

  const handleCard = () => {
    switch (type) {
      case "user":
        return (
          <li>
            <NavLink
              className={
                parseInt(query.get("id"), 10) === data.id
                  ? "listItem navActive"
                  : "listItem"
              }
              to={`?tab=users&edit=user&id=${data.id}`}
              onClick={() => fetchUserById(data.id)}
            >
              <div className="info">
                <h4>{data.username}</h4>
                <p>{data.email}</p>
                <p>{data.role}</p>
              </div>
              <div className="interaction">
                <button
                  type="button"
                  onClick={() => deleteContent("user", data.id)}
                >
                  Delete
                </button>
              </div>
            </NavLink>
          </li>
        );
      case "aircraft":
        return (
          <li>
            <NavLink
              className={
                parseInt(query.get("id"), 10) === data.id
                  ? "listItem navActive"
                  : "listItem"
              }
              to={`?tab=aircrafts&edit=aircraft&id=${data.id}`}
              onClick={() => fetchAircraftById(data.id)}
            >
              <div className="info">
                <h4>{data.name}</h4>
                <p>{data.manufacturer}</p>
                <p>{data.type}</p>
              </div>
              <div className="interaction">
                <button
                  type="button"
                  onClick={() => deleteContent("aircraft", data.id)}
                >
                  Delete
                </button>
              </div>
            </NavLink>
          </li>
        );
      case "manufacturer":
        return (
          <li>
            <NavLink
              className={
                parseInt(query.get("id"), 10) === data.id
                  ? "listItem navActive"
                  : "listItem"
              }
              to={`?tab=manufacturers&edit=manufacturer&id=${data.id}`}
              onClick={() => fetchManufacturerById(data.id)}
            >
              <div className="info">
                <h4>{data.name}</h4>
              </div>
              <div className="interaction">
                <button
                  type="button"
                  onClick={() => deleteManufacturer(data.id)}
                >
                  Delete
                </button>
              </div>
            </NavLink>
          </li>
        );
      case "type":
        return (
          <li>
            <NavLink
              className={
                parseInt(query.get("id"), 10) === data.id
                  ? "listItem navActive"
                  : "listItem"
              }
              to={`?tab=types&edit=type&id=${data.id}`}
              onClick={() => fetchTypeById(data.id)}
            >
              <div className="info">
                <h4>{data.name}</h4>
              </div>
              <div className="interaction">
                <button type="button" onClick={() => deleteType(data.id)}>
                  Delete
                </button>
              </div>
            </NavLink>
          </li>
        );
      default:
        return null;
    }
  };

  return handleCard();
};

export default Card;
