import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showSubmitError, setshowSubmitError] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setusername(event.target.value);
  };

  const onChangePassword = (event) => {
    setpassword(event.target.value);
  };

  const onChangeShowPassword = (event) => {
    if (event.target.checked) {
      setshowPassword(true);
    } else {
      setshowPassword(false);
    }
  };

  const onSubmitSuccess = () => {
    navigate("/path");
  };

  const onSubmitFailure = (errorMsg) => {
    setshowSubmitError(true);
    console.log(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if ((username === "ccbp") & (password === "ccbp")) {
      onSubmitSuccess();
    } else {
      onSubmitFailure("error");
    }
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };
  return (
    <div className="background">
      <div className="login-form-container">
        <form className="form-container" onSubmit={submitForm}>
          <h1>Login Form</h1>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <div className="show-password-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onChange={onChangeShowPassword}
            />
            <label htmlFor="checkbox" className="show-password">
              Show Password
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*Error{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
