import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header";
import axios from "@services/axios";
import "@styles/Login.scss";

const formInitialState = {
  username: "",
  email: "",
  password: "",
};

const loginForm = (state, action) => {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return { ...state, username: action.payload };
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

const Signup = () => {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(loginForm, formInitialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredit = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      axios
        .post(`users/`, userCredit, {
          withCredentials: true,
        })
        // eslint-disable-next-line no-restricted-syntax
        // alert("Successfully logged in");
        .dispatch({ type: "RESET_FORM" });
      return navigate("/");
    } catch (err) {
      return alert(err?.response.data);
    }
  };

  return (
    <div className="page">
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          required
          value={formData.username}
          onChange={(e) =>
            dispatch({ type: "UPDATE_USERNAME", payload: e.target.value })
          }
        />
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
