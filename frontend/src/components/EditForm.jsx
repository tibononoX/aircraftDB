import { useEffect, useState } from "react";
import axios from "@services/axios";
import "@styles/EditForm.scss";
import AcForm from "./AcForm";
import ManTypeForm from "./ManTypeForm";

const EditForm = ({
  type,
  id,
  formData,
  fetchUsers,
  fetchAircrafts,
  fetchAircraftById,
  fetchManufacturers,
  fetchManufacturerById,
  fetchTypes,
  fetchTypeById,
}) => {
  const [newRole, setNewRole] = useState();
  const editUserRole = async (e) => {
    e.preventDefault();

    const prop = {
      role: newRole,
    };

    await axios.put(`users/${id}`, prop, { withCredentials: true });
    setNewRole();
    return fetchUsers();
  };

  useEffect(() => {
    if (formData) {
      setNewRole(formData.role);
    }
  }, [formData]);

  switch (type) {
    case "user":
      return (
        <form className="edit-form" onSubmit={editUserRole}>
          <label htmlFor="role">
            Edit {formData ? formData.username : "..."}'s role: <br />
          </label>
          <select
            value={newRole}
            name="role"
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Edit</button>
        </form>
      );
    case "aircraft":
      return (
        <AcForm
          type="aircraft"
          formData={formData}
          fetchAircrafts={fetchAircrafts}
          id={id}
          fetchAircraftById={fetchAircraftById}
        />
      );
    case "newAircraft":
      return (
        <AcForm
          type="newAircraft"
          formData={formData}
          fetchAircrafts={fetchAircrafts}
          id={id}
          fetchAircraftById={fetchAircraftById}
        />
      );
    case "manufacturer":
      return (
        <ManTypeForm
          type="manufacturer"
          formData={formData}
          fetchManufacturers={fetchManufacturers}
          id={id}
          fetchManufacturerById={fetchManufacturerById}
        />
      );
    case "newManufacturer":
      return (
        <ManTypeForm
          type="newManufacturer"
          formData={formData}
          fetchManufacturers={fetchManufacturers}
          id={id}
          fetchManufacturerById={fetchManufacturerById}
        />
      );
    case "type":
      return (
        <ManTypeForm
          type="type"
          formData={formData}
          fetchTypes={fetchTypes}
          id={id}
          fetchTypeById={fetchTypeById}
        />
      );
    case "newType":
      return (
        <ManTypeForm
          type="newType"
          formData={formData}
          fetchTypes={fetchTypes}
          id={id}
          fetchTypeById={fetchTypeById}
        />
      );
    default:
      return null;
  }
};

export default EditForm;
