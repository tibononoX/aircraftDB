import { useEffect, useState } from "react";
import axios from "@services/axios";
import "@styles/EditForm.scss";
import AcForm from "./AcForm";

const EditForm = ({ type, id, formData, fetchUsers, fetchAircrafts }) => {
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
    setNewRole(formData.role);
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
      return <AcForm formData={formData} fetchAircrafts={fetchAircrafts} />;
    default:
      return null;
  }
};

export default EditForm;
