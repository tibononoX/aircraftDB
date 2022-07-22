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
      const register = await axios
        .post(`users/`, userCredit, {
          withCredentials: true,
        })
        .then((result) => result.data);
      if (register) {
        dispatch({ type: "RESET_FORM" });
        return navigate("/");
      }
    } catch (err) {
      return alert(err?.response.data);
    }
    return null;
  };

  return (
    <div className="page">
      <Header />
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            placeholder="Username"
            required
            value={formData.username}
            onChange={(e) =>
              dispatch({ type: "UPDATE_USERNAME", payload: e.target.value })
            }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
            }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value })
            }
          />
        </label>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
