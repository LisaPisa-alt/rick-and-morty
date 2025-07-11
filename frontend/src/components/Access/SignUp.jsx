import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RickandMorty from "../../images/rick-and-morty.png";
import { signUp } from "../../utils/api";
import { setToken } from "../../utils/userSession";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./styles.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (event) => {
    setSignUpInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const signUpUser = async (event) => {
    event.preventDefault();

    try {
      const data = await signUp(signUpInfo);
      if (data.token) {
        setToken(data.token);
      }
      navigate("/characters");
      setSignUpInfo({ username: "", password: "" });
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
      <h1>To see Pickle Rick you need to sign up</h1>

      <form className="form" onSubmit={signUpUser}>
        <input
          name="username"
          placeholder="Username"
          value={signUpInfo.username}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="password"
          placeholder="Password"
          value={signUpInfo.password}
          type="password"
          onChange={handleChange}
          className="input"
          required
        />
        {errorMessage && <ErrorMessage error={errorMessage} />}
        <button className="submitButton" type="submit">
          Sign Up
        </button>
      </form>

      <p className="redirectText">
        Have an account? Go to
        <span
          className="redirectLink"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUp;
