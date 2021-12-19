import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Form from "../components/Form";
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import { BASE_URL } from "../Helpers/constants";

const Login = ({ history }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameInfo, setUserNameInfo] = useState(null);
  const [passwordInfo, setPasswordInfo] = useState(null);
  const [alert, setAlert] = useState(null);
  const closeAlert = () => {
    setAlert(null);
  };

  const inputChange = (name, value) => {
    if (name === "username") setUserName(value);
    else if (name === "password") setPassword(value);
  };

  const isButtonDisabled = () => {
    if (passwordInfo != null || userNameInfo != null) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    document.title = "Login | AnonyMsg";
  }, []);

  useEffect(() => {
    setUserNameInfo(null);
  }, [userName]);

  useEffect(() => {
    setPasswordInfo(null);
  }, [password]);

  const handleLoginClick = async (event) => {
    event.preventDefault();

    if (userName === "") {
      setUserNameInfo({
        type: "error",
        msg: "Username cannot be empty",
      });
    }
    if (password === "") {
      setPasswordInfo({
        type: "error",
        msg: "Password cannot be empty",
      });
    }

    if (userName && password) {
      const userData = {
        username: userName.trim(),
        password: password,
      };
      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(userData), // body data type must match "Content-Type" header
        });
        const serverData = await response.json();
        if (response.status === 200) {
          localStorage.setItem("Access-Token", serverData.token);
          history.push("/dashboard");
        }

        if (!response.ok) {
          switch (response.status) {
            case 404:
              setUserNameInfo({
                type: "error",
                msg: "Username not found",
              });
              break;
            case 401:
              setPasswordInfo({
                type: "error",
                msg: "Password is incorrect",
              });
              break;
            case 500:
              setAlert({
                type: "error",
                title: "Network Error",
                content: "Make sure you are connected to a network.",
                buttonName: "Close",
                clickEvent: closeAlert,
              });
              break;
            default:
              break;
          }
        } else {
          setAlert({
            type: "error",
            title: "Error",
            content: "Something went wrong",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
        }
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          content: error,
          buttonName: "Close",
          clickEvent: closeAlert,
        });
      }
    }
  };

  return (
    <>
      <Form title="Welcome Back">
        <form autoComplete="on" className="box-form">
          <Input
            info={userNameInfo}
            value={userName}
            name="username"
            title="Username"
            type="text"
            icon="fa-at first-icon"
            inputChange={inputChange}
          />
          <Input
            info={passwordInfo}
            value={password}
            name="password"
            title="Password"
            type="password"
            icon="fa-lock second-icon"
            inputChange={inputChange}
          />
          <Button
            bgcolor="secondary-color"
            disabled={isButtonDisabled()}
            className="btn primary-btn"
            onClick={handleLoginClick}
            type="submit"
          >
            Login
          </Button>
        </form>
        <div className="prompts">
          <p>
            Don't have an account ? <Link to="/signup">Create an account.</Link>
          </p>
        </div>
      </Form>
      {alert && <AlertBox {...alert} />}
    </>
  );
};

export default Login;
