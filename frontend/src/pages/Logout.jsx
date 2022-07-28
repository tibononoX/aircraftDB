import axios from "@services/axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@contexts/UserContext";
import UserFav from "@contexts/UserFav";

const Logout = () => {
  const { user, setUser } = useContext(UserContext);
  const { setUserFav } = useContext(UserFav);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      if (!user) {
        return console.warn("You are not logged in");
      }
      await axios
        .get("users/logout", {
          withCredentials: true,
        })
        .then((response) => response.data);
      // eslint-disable-next-line no-restricted-syntax
      setUser();
      setUserFav([]);
      return navigate("/");
    } catch (err) {
      return console.warn(err);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <section className="loginForm">
      <h1>LOGIN OUT ...</h1>
    </section>
  );
};

export default Logout;
