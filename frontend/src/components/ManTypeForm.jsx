import { useEffect, useReducer } from "react";
import axios from "@services/axios";

const initialForm = {
  name: "",
  desc: "",
};

const handleForm = (state, action) => {
  switch (action.type) {
    case "UPDATE_INITIAL":
      return action.payload;
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_DESC":
      return { ...state, desc: action.payload };
    case "UPDATE_RESET":
      return initialForm;
    default:
      return { ...state };
  }
};

const ManTypeForm = ({
  type,
  formData,
  fetchManufacturers,
  fetchManufacturerById,
  id,
  fetchTypes,
  fetchTypeById,
}) => {
  const [currentData, dispatch] = useReducer(handleForm, initialForm);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const prop = {
      name: currentData.name,
      desc: currentData.desc,
    };

    try {
      await axios.put(`aircrafts/${type}s/${id}`, prop, {
        withCredentials: true,
      });
      switch (type) {
        case "manufacturer":
          fetchManufacturerById(id);
          return fetchManufacturers();
        case "type":
          fetchTypeById(id);
          return fetchTypes();
        default:
          return null;
      }
    } catch (err) {
      if (err) {
        return alert(err.response.data);
      }
    }
    return null;
  };

  const handlePostRoute = () => {
    switch (type) {
      case "manufacturer":
        return "manufacturer";
      case "type":
        return "type";
      case "newManufacturer":
        return "manufacturer";
      case "newType":
        return "type";

      default:
        return null;
    }
  };

  const handleNewSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      name: currentData.name,
      desc: currentData.desc,
    };

    try {
      const newAircraft = await axios
        .post(`aircrafts/${handlePostRoute()}s`, newData, {
          withCredentials: true,
        })
        .then((response) => response.data);
      if (newAircraft) {
        dispatch({ type: "RESET_FORM" });
        alert(`Content added !`);

        switch (type) {
          case "newManufacturer":
            return fetchManufacturers();
          case "newType":
            return fetchTypes();
          default:
            return null;
        }
      }
    } catch (err) {
      return alert(err?.response.data);
    }
    return null;
  };

  const handleFormData = () => {
    switch (type) {
      case "manufacturer":
        return dispatch({
          type: "UPDATE_INITIAL",
          payload: {
            name: formData?.name,
            desc: formData?.desc,
          },
        });
      case "type":
        return dispatch({
          type: "UPDATE_INITIAL",
          payload: {
            name: formData?.name,
            desc: formData?.desc,
          },
        });
      case "newManufacturer":
        return dispatch({
          type: "UPDATE_RESET",
        });
      case "newType":
        return dispatch({
          type: "UPDATE_RESET",
        });
      default:
        return null;
    }
  };

  useEffect(() => {
    handleFormData();
  }, [formData, id]);

  const handleType = (select = type) => {
    switch (select) {
      case "manufacturer":
        return (
          <form className="edit-form" onSubmit={handleEditSubmit}>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                value={currentData.name}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_NAME", payload: e.target.value })
                }
              />
            </label>
            <label htmlFor="desc">
              Description:{" "}
              <textarea
                type="text"
                name="desc"
                value={currentData.desc}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_DESC", payload: e.target.value })
                }
                cols="30"
                rows="10"
              />
            </label>
            <button type="submit">Edit</button>
          </form>
        );
      case "newManufacturer":
        return (
          <>
            <p>New manufacturer</p>
            <form className="edit-form" onSubmit={handleNewSubmit}>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentData.name}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_NAME", payload: e.target.value })
                  }
                />
              </label>

              <label htmlFor="desc">
                Description:{" "}
                <textarea
                  type="text"
                  name="desc"
                  value={currentData.desc}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_DESC", payload: e.target.value })
                  }
                  cols="30"
                  rows="10"
                />
              </label>

              <button type="submit">Add</button>
            </form>
          </>
        );
      case "type":
        return (
          <form className="edit-form" onSubmit={handleEditSubmit}>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                value={currentData.name}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_NAME", payload: e.target.value })
                }
              />
            </label>
            <label htmlFor="desc">
              Description:{" "}
              <textarea
                type="text"
                name="desc"
                value={currentData.desc}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_DESC", payload: e.target.value })
                }
                cols="30"
                rows="10"
              />
            </label>
            <button type="submit">Edit</button>
          </form>
        );
      case "newType":
        return (
          <>
            <p>New type</p>

            <form className="edit-form" onSubmit={handleNewSubmit}>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentData.name}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_NAME", payload: e.target.value })
                  }
                />
              </label>

              <label htmlFor="desc">
                Description:{" "}
                <textarea
                  type="text"
                  name="desc"
                  value={currentData.desc}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_DESC", payload: e.target.value })
                  }
                  cols="30"
                  rows="10"
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

export default ManTypeForm;
