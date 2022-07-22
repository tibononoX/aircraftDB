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
  const [manufacturersList, setManufacturersList] = useState();
  const [typesList, setTypesList] = useState();
  const [formData, setFormData] = useState({
    name: "",
    manufacturer_id: 1,
    type_id: 1,
    desc: "",
    year: "",
  });

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

  const fetchManufacturers = async () => {
    try {
      const newManufacturersList = await axios
        .get("aircrafts/manufacturers", {
          withCredentials: true,
        })
        .then((result) => result.data);
      if (newManufacturersList) {
        return setManufacturersList(newManufacturersList);
      }
    } catch (err) {
      if (err) {
        return alert(err.response.data);
      }
    }
    return null;
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
        return console.warn("Aircraft not found");
      }
      setFormData(newAircraft);
    } catch (err) {
      return err;
    }
    return null;
  };

  const fetchManufacturerById = async (id) => {
    try {
      const newManufacturer = await axios
        .get(`aircrafts/manufacturers/${id}`, { withCredentials: true })
        .then((result) => result.data);
      if (!newManufacturer) {
        return console.warn("Manufacturer not found");
      }
      setFormData(newManufacturer);
    } catch (err) {
      return err;
    }
    return null;
  };

  const fetchTypeById = async (id) => {
    try {
      const newType = await axios
        .get(`aircrafts/types/${id}`, { withCredentials: true })
        .then((result) => result.data);
      if (!newType) {
        return console.warn("Type not found");
      }
      setFormData(newType);
    } catch (err) {
      return err;
    }
    return null;
  };

  useEffect(() => {
    fetchUsers();
    fetchAircrafts();
    fetchManufacturers();
    fetchTypes();
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
      case "manufacturers":
        return (
          <ul className="contentList">
            {manufacturersList &&
              manufacturersList.map((manufacturer) => (
                <Card
                  type="manufacturer"
                  data={manufacturer}
                  fetchManufacturers={fetchManufacturers}
                  fetchManufacturerById={fetchManufacturerById}
                />
              ))}
          </ul>
        );
      case "types":
        return (
          <ul className="contentList">
            {typesList &&
              typesList.map((type) => (
                <Card
                  type="type"
                  data={type}
                  fetchTypes={fetchTypes}
                  fetchTypeById={fetchTypeById}
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
            fetchAircraftById={fetchAircraftById}
            formData={formData}
          />
        );
      case "newAircraft":
        return (
          <EditForm
            type="newAircraft"
            id={query.get("id")}
            fetchAircrafts={fetchAircrafts}
            fetchAircraftById={fetchAircraftById}
            formData={formData}
          />
        );
      case "manufacturer":
        return (
          <EditForm
            type="manufacturer"
            id={query.get("id")}
            fetchManufacturers={fetchManufacturers}
            fetchManufacturerById={fetchManufacturerById}
            formData={formData}
          />
        );
      case "newManufacturer":
        return (
          <EditForm
            type="newManufacturer"
            id={query.get("id")}
            fetchManufacturers={fetchManufacturers}
            fetchManufacturerById={fetchManufacturerById}
            formData={formData}
          />
        );
      case "type":
        return (
          <EditForm
            type="type"
            id={query.get("id")}
            fetchTypes={fetchTypes}
            fetchTypeById={fetchTypeById}
            formData={formData}
          />
        );
      case "newType":
        return (
          <EditForm
            type="newType"
            id={query.get("id")}
            fetchTypes={fetchTypes}
            fetchTypeById={fetchTypeById}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  const handleTabName = () => {
    switch (query.get("tab")) {
      case "users":
        return "Users";
      case "aircrafts":
        return "Aircrafts";
      case "manufacturers":
        return "Manufacturers";
      case "types":
        return "Types";
      default:
        return "";
    }
  };

  const handleNewName = () => {
    if (query.get("tab") === "aircrafts") {
      if (query.get("edit") !== "newAircraft") {
        return (
          <NavLink to="?tab=aircrafts&edit=newAircraft">
            Add a new aircraft
          </NavLink>
        );
      }
    }
    if (query.get("tab") === "manufacturers") {
      if (query.get("edit") !== "newManufacturer") {
        return (
          <NavLink to="?tab=manufacturers&edit=newManufacturer">
            Add a new manufacturer
          </NavLink>
        );
      }
    }
    if (query.get("tab") === "types") {
      if (query.get("edit") !== "newType") {
        return <NavLink to="?tab=types&edit=newType">Add a new type</NavLink>;
      }
    }
    return null;
  };

  return (
    <div className="page">
      <Header />
      <section className="admin-page">
        <header className="admin-nav">
          <NavLink
            className={
              query.get("tab") === "users" ? "adminLink navActive" : "adminLink"
            }
            to="?tab=users"
          >
            Users
          </NavLink>
          <NavLink
            className={
              query.get("tab") === "aircrafts"
                ? "adminLink navActive"
                : "adminLink"
            }
            to="?tab=aircrafts&edit=newAircraft"
          >
            Aircrafts
          </NavLink>
          <NavLink
            className={
              query.get("tab") === "manufacturers"
                ? "adminLink navActive"
                : "adminLink"
            }
            to="?tab=manufacturers&edit=newManufacturer"
          >
            Manufacturers
          </NavLink>
          <NavLink
            className={
              query.get("tab") === "types" ? "adminLink navActive" : "adminLink"
            }
            to="?tab=types&edit=newType"
          >
            Types
          </NavLink>
        </header>
        <h1>{handleTabName()}</h1>
        <div className="admin-tools">
          <div className="tab">
            {handleTab()}

            <div className="edit-side">
              {handleNewName()}
              {handleForm()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
