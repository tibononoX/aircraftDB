import { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@contexts/UserContext";
import Header from "@components/Header";
import axios from "@services/axios";
import "@styles/Login.scss";

const formInitialState = {
  password: "",
  email: "",
};

const loginForm = (state, action) => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET_FORM":
      return { ...formInitialState };
    default:
      return state;
  }
};

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(loginForm, formInitialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredit = {
      password: formData.password,
      email: formData.email,
    };

    try {
      const userData = await axios
        .post(`users/login`, userCredit, {
          withCredentials: true,
        })
        .then((response) => response.data);
      // eslint-disable-next-line no-restricted-syntax
      setUser(userData);
      // alert("Successfully logged in");
      dispatch({ type: "RESET_FORM" });
      return navigate("/");
    } catch (err) {
      return alert(err.response.data);
    }
  };

  return (
    <div className="page">
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          required
          value={formData.email}
          onChange={(e) =>
            dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="password"
          required
          value={formData.password}
          onChange={(e) =>
            dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value })
          }
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
