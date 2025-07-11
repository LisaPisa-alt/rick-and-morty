import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RickandMorty from "../../images/rick-and-morty.png";
import { login } from "../../utils/api";
import { setToken } from "../../utils/userSession";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./styles.scss";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const data = await login(loginInfo);
      if (data.token) {
        setToken(data.token);
      }
      navigate("/characters");
      setLoginInfo({ username: "", password: "" });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <img
        className="imageHeader"
        alt="rick and morty wiki"
        src={RickandMorty}
      />
      <h1>To see Pickle Rick you need to sign in</h1>
      <form className="form form-login" onSubmit={loginUser}>
        <input
          name="username"
          placeholder="Username"
          value={loginInfo.username}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={loginInfo.password}
          onChange={handleChange}
          className="input"
          required
        />
        {errorMessage && <ErrorMessage error={errorMessage} />}
        <button className="submitButton" type="submit">
          Sign In
        </button>
      </form>
      <p className="redirectText">
        Don't have an account? Go to
        <span
          className="redirectLink"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
