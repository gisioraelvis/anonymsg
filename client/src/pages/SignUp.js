import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import {
  validateUserName,
  validatePassword,
  validateEmail,
} from "../Helpers/validation";
import { BASE_URL } from "../Helpers/constants";

const SignUp = ({ history }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNameInfo, setUserNameInfo] = useState(null);
  const [emailInfo, setEmailInfo] = useState(null);
  const [passwordInfo, setPasswordInfo] = useState(null);
  const [confirmPasswordInfo, setConfirmPasswordInfo] = useState(null);

  const [alert, setAlert] = useState(null);

  const inputChange = (name, value) => {
    if (name === "username") setUserName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmpassword") setConfirmPassword(value);
  };

  const isButtonDisabled = () => {
    if (
      userNameInfo != null ||
      emailInfo != null ||
      passwordInfo != null ||
      confirmPasswordInfo != null
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [redirect, setRedirect] = useState("");
  const closeAlert = () => {
    setAlert(null);
    redirect === "" ? history.push("/signup") : history.push(`${redirect}`);
  };

  useEffect(() => {
    document.title = "SignUp | AnonyMsg ";
  }, []);

  useEffect(() => {
    setUserNameInfo(null);
    if (userName && !validateUserName(userName)) {
      setUserNameInfo({
        type: "warning",
        msg: "Only use letters and numbers",
      });
      return;
    }
  }, [userName]);

  useEffect(() => {
    setEmailInfo(null);
    if (email && !validateEmail(email)) {
      setEmailInfo({
        type: "warning",
        msg: "Enter a valid Email",
      });
      return;
    }
  }, [email]);

  useEffect(() => {
    setPasswordInfo(null);
    if (password && !validatePassword(password)) {
      setPasswordInfo({
        type: "warning",
        msg: "Minimum 6 characters required",
      });
      return;
    }
  }, [password]);

  useEffect(() => {
    setConfirmPasswordInfo(null);
    if (confirmPassword !== password) {
      setConfirmPasswordInfo({
        type: "warning",
        msg: "Passwords do not match",
      });
      return;
    }
  }, [confirmPassword, password]);

  const handleRegisterClick = async (event) => {
    event.preventDefault();

    if (userName === "") {
      setUserNameInfo({
        type: "error",
        msg: "Username cannot be empty",
      });
    }

    if (email === "") {
      setEmailInfo({
        type: "error",
        msg: "Name cannot be empty",
      });
    }

    if (password === "") {
      setPasswordInfo({
        type: "error",
        msg: "Password cannot be empty",
      });
    }

    if (confirmPassword === "") {
      setConfirmPassword({
        type: "error",
        msg: "Confirm Password cannot be empty",
      });
    }

    if (email && userName && password) {
      const userData = {
        username: userName.trim(),
        email: email.trim(),
        password: password,
      };

      try {
        const response = await fetch(`${BASE_URL}/users/signup`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(userData), // body data type must match "Content-Type" header
        });

        if (response.status === 201) {
          setRedirect("/login");
          setAlert({
            type: "success",
            title: "Success!",
            content: "You have successfully registered. Login to continue",
            buttonName: "Login",
            clickEvent: closeAlert,
          });
          return;
        }
        if (response.status === 409) {
          setUserNameInfo({
            type: "error",
            msg: "Username taken",
          });
          return;
        }

        if (response.status === 500) {
          setAlert({
            type: "error",
            title: "Network Error",
            content: "Make sure you are connected to a network.",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
          return;
        } /*  else {
          setAlert({
            type: "error",
            title: "Error",
            content: "Something went wrong.",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
        } */
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          content: "An Error has occurred.",
          buttonName: "Close",
          clickEvent: closeAlert,
        });
      }
    }
  };
  return (
    <>
      <Form title="Sign Up">
        <form autoComplete="on" className="box-form">
          <Input
            info={userNameInfo}
            value={userName}
            name="username"
            title="Username"
            type="text"
            icon="fa-at second-icon"
            inputChange={inputChange}
          />
          <Input
            info={emailInfo}
            value={email}
            name="email"
            title="Email"
            type="email"
            icon="fa-user first-icon"
            inputChange={inputChange}
          />
          <Input
            info={passwordInfo}
            value={password}
            name="password"
            title="Password"
            type="password"
            icon="fa-lock third-icon"
            inputChange={inputChange}
          />
          <Input
            info={confirmPasswordInfo}
            value={confirmPassword}
            name="confirmpassword"
            title="Confirm Password"
            type="password"
            icon="fa-lock third-icon"
            inputChange={inputChange}
          />
          <Button
            bgcolor="secondary-color"
            disabled={isButtonDisabled()}
            className="btn primary-btn"
            onClick={handleRegisterClick}
            type="submit"
          >
            Register
          </Button>
        </form>
        <div>
          <p>
            Already have an account ? <Link to="/login">Log in.</Link>
          </p>
        </div>
      </Form>
      {alert && <AlertBox {...alert} />}
    </>
  );
};

export default SignUp;
