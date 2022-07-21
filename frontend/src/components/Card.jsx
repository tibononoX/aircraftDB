import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
}) => {
  const query = useQuery();

  const deleteContent = async (contentType, id) => {
    if (
      window.confirm(`Are you sure you want to delete ${contentType} ${id}`)
    ) {
      await axios.delete(`${contentType}s/${id}`, { withCredentials: true });
      if (type === "user") {
        return fetchUsers();
      }
      return fetchAircrafts();
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
              className="listItem aircraft"
              to={`?tab=aircrafts&edit=aircraft&id=${data.id}`}
              onClick={() => fetchAircraftById(data.id)}
            >
              <div className="info">
                <h4>{data.name}</h4>
                <p>{data.manufacturer}</p>
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
      default:
        return null;
    }
  };

  return handleCard();
};

export default Card;
