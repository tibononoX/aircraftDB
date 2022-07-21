import { useMemo, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "@services/axios";
import formatDate from "@services/dateFormat";
import Header from "@components/Header";
import Card from "@components/Card";
import EditForm from "@components/EditForm";

import "@styles/Admin.scss";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Admin = () => {
  const query = useQuery();
  const [userList, setUserList] = useState();
  const [aircraftList, setAircraftList] = useState();
  const [formData, setFormData] = useState();

  const fetchUsers = async () => {
    try {
      const users = await axios
        .get("users/", { withCredentials: true })
        .then((result) => result.data);
      if (users.length > 0) {
        return setUserList(users);
      }
      return setUserList();
    } catch (err) {
      return alert(err.data.message);
    }
  };

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

  const fetchUserById = async (id) => {
    try {
      const newUser = await axios
        .get(`users/${id}`, { withCredentials: true })
        .then((result) => {
          const user = result.data;
          const registerDate = formatDate(user.creationDate);
          /* eslint-disable-next-line */
          user.creationDate = registerDate;
          return user;
        });
      if (!newUser) {
        return console.warn("User not found");
      }
      setFormData(newUser);
    } catch (err) {
      return err;
    }
    return null;
  };

  const fetchAircraftById = async (id) => {
    try {
      const newAircraft = await axios
        .get(`aircrafts/${id}`, { withCredentials: true })
        .then((result) => result.data);
      if (!newAircraft) {
        return console.warn("User not found");
      }
      setFormData(newAircraft);
    } catch (err) {
      return err;
    }
    return null;
  };

  useEffect(() => {
    fetchUsers();
    fetchAircrafts();
  }, []);

  const handleTab = () => {
    switch (query.get("tab")) {
      case "users":
        return (
          <ul className="contentList">
            {userList &&
              userList.map((user) => (
                <Card
                  type="user"
                  data={user}
                  fetchUsers={fetchUsers}
                  fetchUserById={fetchUserById}
                />
              ))}
          </ul>
        );
      case "aircrafts":
        return (
          <ul className="contentList">
            {aircraftList &&
              aircraftList.map((aircraft) => (
                <Card
                  type="aircraft"
                  data={aircraft}
                  fetchAircrafts={fetchAircrafts}
                  fetchAircraftById={fetchAircraftById}
                />
              ))}
          </ul>
        );
      default:
        return null;
    }
  };

  const handleForm = () => {
    switch (query.get("edit")) {
      case "user":
        return (
          <EditForm
            type="user"
            id={query.get("id")}
            fetchUsers={fetchUsers}
            formData={formData}
          />
        );
      case "aircraft":
        return (
          <EditForm
            type="aircraft"
            id={query.get("id")}
            fetchAircrafts={fetchAircrafts}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Header />
      <section className="admin-page">
        <header className="admin-nav">
          <NavLink to="?tab=users">Manage users</NavLink>
          <NavLink to="?tab=aircrafts">Manage aircrafts</NavLink>
        </header>
        <h1>{query.get("tab") === "users" ? "Users" : "Aircrafts"}</h1>
        <div className="admin-tools">
          <div className="tab">
            {handleTab()}
            <div className="edit-side">{handleForm()}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
