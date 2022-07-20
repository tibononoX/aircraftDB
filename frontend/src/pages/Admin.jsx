import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Header from "@components/Header";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Admin = () => {
  const query = useQuery();

  const handleTab = () => {
    switch (query.get("tab")) {
      case "users":
        return <h1>users</h1>;
      case "aircrafts":
        return <h1>aircrafts</h1>;
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Header />
      <section className="admin-page">
        <header className="adminNav">
          <NavLink to="?tab=users">Manage users</NavLink>
          <NavLink to="?tab=aircrafts">Manage aircrafts</NavLink>
        </header>
        <div className="admin-tools">{handleTab()}</div>
      </section>
    </div>
  );
};

export default Admin;
