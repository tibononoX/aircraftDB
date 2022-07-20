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
        return (
          <div className="tab">
            <ul className="contentList">
              <li>user 1</li>
              <li>user 2</li>
              <li>user 3</li>
            </ul>
          </div>
        );
      case "aircrafts":
        return (
          <div className="tab">
            <ul className="contentList">
              <li>aircraft 1</li>
              <li>aircraft 2</li>
              <li>aircraft 3</li>
            </ul>
          </div>
        );
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
