import { useState } from "react";
import Api from "@pages/Api";
import Catalog from "@pages/Catalog";
import Contact from "@pages/Contact";
import Homepage from "@pages/Homepage";
import Login from "@pages/Login";
import Logout from "@pages/Logout";
import Signup from "@pages/Signup";
import Admin from "@pages/Admin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserContext from "@contexts/UserContext";
import AcInfo from "@contexts/AcInfo";
import "@styles/App.scss";
import Aircraft from "@pages/Aircraft";

function App() {
  const [user, setUser] = useState();
  const [aircraftInfo, setAircraftInfo] = useState();

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <UserContext.Provider value={{ user, setUser }}>
        {/* eslint-disable-next-line */}
        <AcInfo.Provider value={{ aircraftInfo, setAircraftInfo }}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Homepage setAircraftInfo={setAircraftInfo} />}
              />
              {user && user.role === "Admin" && (
                <Route path="/admin" element={<Admin />} />
              )}
              <Route
                path="/aircraft/:id"
                element={<Aircraft data={aircraftInfo} />}
              />
              <Route
                path="/catalog"
                element={
                  <Catalog
                    aircraftInfo={aircraftInfo}
                    setAircraftInfo={setAircraftInfo}
                  />
                }
              />
              <Route path="/api" element={<Api />} />
              <Route path="/contact" element={<Contact />} />
              {!user && <Route path="/signup" element={<Signup />} />}
              {!user && <Route path="/login" element={<Login />} />}
              {user && <Route path="/logout" element={<Logout />} />}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </AcInfo.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
