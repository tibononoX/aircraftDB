import { useState, useEffect, useReducer } from "react";
import axios from "@services/axios";

const initialForm = {
  name: "",
  manufacturer_id: 1,
  type_id: 1,
  desc: "",
  year: "",
};

const handleForm = (state, action) => {
  switch (action.type) {
    case "UPDATE_INITIAL":
      return action.payload;
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_MAN":
      return { ...state, manufacturer_id: action.payload };
    case "UPDATE_TYPE":
      return { ...state, type_id: action.payload };
    case "UPDATE_DESC":
      return { ...state, desc: action.payload };
    case "UPDATE_YEAR":
      return { ...state, year: action.payload };
    case "UPDATE_RESET":
      return initialForm;
    default:
      return { ...state };
  }
};

const AcForm = ({ type, formData, fetchAircrafts, id, fetchAircraftById }) => {
  const [manufacturersList, setManufacturersList] = useState();
  const [typesList, setTypesList] = useState();
  const [acData, dispatch] = useReducer(handleForm, initialForm);
  const [files, setFiles] = useState(null);

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const prop = {
      name: acData.name,
      manufacturer_id: acData.manufacturer_id,
      type_id: acData.type_id,
      desc: acData.desc,
      year: acData.year,
    };

    try {
      await axios.put(`aircrafts/${id}`, prop, { withCredentials: true });
      fetchAircraftById(id);
      return fetchAircrafts();
    } catch (err) {
      if (err) {
        return alert(err.response.data);
      }
    }
    return null;
  };

  const handleNewSubmit = async (e) => {
    e.preventDefault();

    const aircraftData = {
      name: acData.name,
      manufacturer_id: acData.manufacturer_id,
      type_id: acData.type_id,
      desc: acData.desc,
      year: acData.year,
    };

    if (!files) {
      try {
        const newAircraft = await axios
          .post("aircrafts/", aircraftData, { withCredentials: true })
          .then((response) => response.data);
        if (newAircraft) {
          dispatch({ type: "RESET_FORM" });
          alert("New aircraft added !");
          return fetchAircrafts();
        }
      } catch (err) {
        return alert(err?.response.data);
      }
      return null;
    }

    const aircraft = new FormData();
    for (let x = 0; x < files.length; x += 1) {
      aircraft.append("file", files[x]);
    }
    aircraft.append("aircraftData", JSON.stringify(aircraftData));
    try {
      const newAircraft = await axios
        .post("aircrafts?file=aircraft", aircraft, { withCredentials: true })
        .then((response) => response.data);
      if (newAircraft) {
        dispatch({ type: "RESET_FORM" });
        alert("Nouveau projet ajouté !");
        return fetchAircrafts();
      }
    } catch (err) {
      return alert(err?.response.data);
    }
    return null;
  };

  useEffect(() => {
    fetchManufacturers();
    fetchTypes();
    if (type === "aircraft") {
      dispatch({
        type: "UPDATE_INITIAL",
        payload: {
          name: formData?.name,
          manufacturer_id: formData?.manufacturer_id,
          type_id: formData?.type_id,
          desc: formData?.desc,
          year: formData?.year,
        },
      });
    } else if (type === "newAircraft") {
      dispatch({
        type: "UPDATE_RESET",
      });
    }
  }, [formData, id]);

  const handleType = (select = type) => {
    switch (select) {
      case "aircraft":
        return (
          <form className="edit-form" onSubmit={handleEditSubmit}>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                value={acData.name}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_NAME", payload: e.target.value })
                }
              />
            </label>

            <label htmlFor="manufacturer">
              Manufacturer:
              <select
                name="manufacturer"
                value={acData.manufacturer_id}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_MAN", payload: e.target.value })
                }
              >
                {manufacturersList &&
                  manufacturersList.map((manufacturer) => (
                    <option value={manufacturer.id}>{manufacturer.name}</option>
                  ))}
              </select>
            </label>

            <label htmlFor="type">
              Aircraft type:
              <select
                name="type"
                value={acData.type_id}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_TYPE", payload: e.target.value })
                }
              >
                {typesList &&
                  typesList.map((acType) => (
                    <option value={acType.id}>{acType.name}</option>
                  ))}
              </select>
            </label>

            <label htmlFor="desc">
              Description:{" "}
              <textarea
                type="text"
                name="desc"
                value={acData.desc}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_DESC", payload: e.target.value })
                }
                cols="30"
                rows="10"
              />
            </label>

            <label htmlFor="year">
              First flight year:{" "}
              <input
                type="text"
                name="year"
                value={acData.year}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_YEAR", payload: e.target.value })
                }
              />
            </label>
            <button type="submit">Edit</button>
          </form>
        );
      case "newAircraft":
        return (
          <>
            <p>New aircraft</p>
            <form className="edit-form" onSubmit={handleNewSubmit}>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  value={acData.name}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_NAME", payload: e.target.value })
                  }
                />
              </label>

              <label htmlFor="manufacturer">
                Manufacturer:
                <select
                  name="manufacturer"
                  value={acData.manufacturer_id}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_MAN", payload: e.target.value })
                  }
                >
                  {manufacturersList &&
                    manufacturersList.map((manufacturer) => (
                      <option value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    ))}
                </select>
              </label>

              <label htmlFor="type">
                Aircraft type:
                <select
                  name="type"
                  value={acData.type_id}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_TYPE", payload: e.target.value })
                  }
                >
                  {typesList &&
                    typesList.map((acType) => (
                      <option value={acType.id}>{acType.name}</option>
                    ))}
                </select>
              </label>

              <label htmlFor="desc">
                Description:{" "}
                <textarea
                  type="text"
                  name="desc"
                  value={acData.desc}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_DESC", payload: e.target.value })
                  }
                  cols="30"
                  rows="10"
                />
              </label>

              <label htmlFor="year">
                First flight year:{" "}
                <input
                  type="text"
                  name="year"
                  value={acData.year}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_YEAR", payload: e.target.value })
                  }
                />
              </label>
              <label htmlFor="images">
                Add images:
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </label>

              <button type="submit">Add</button>
            </form>
          </>
        );
      default:
        return <p>Loading ...</p>;
    }
  };

  const handleDisplay = () => {
    if (formData) {
      return handleType();
    }
    return handleType("newAircraft");
  };

  return handleDisplay();
};

export default AcForm;
