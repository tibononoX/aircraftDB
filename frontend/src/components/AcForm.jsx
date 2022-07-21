import { useState, useEffect, useReducer } from "react";
import axios from "@services/axios";

const initialForm = {
  name: "",
  manufacturer_id: null,
  type_id: null,
  desc: "",
  year: null,
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
    default:
      return { ...state };
  }
};

const AcForm = ({ formData }) => {
  const [manufacturersList, setManufacturersList] = useState();

  const [acData, dispatch] = useReducer(handleForm, initialForm);

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

  useEffect(() => {
    fetchManufacturers();
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
  }, [formData]);

  return (
    formData && (
      <form className="edit-form">
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
          <input
            type="text"
            name="type"
            value={acData.type_id}
            onChange={(e) =>
              dispatch({ type: "UPDATE_TYPE", payload: e.target.value })
            }
          />
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
      </form>
    )
  );
};

export default AcForm;
