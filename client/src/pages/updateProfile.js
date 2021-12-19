import React, { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import { validatePassword, validateEmail } from "../Helpers/validation";
import { BASE_URL } from "../Helpers/constants";

const UpdateProfile = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailInfo, setEmailInfo] = useState(null);
  const [passwordInfo, setPasswordInfo] = useState(null);
  const [confirmPasswordInfo, setConfirmPasswordInfo] = useState(null);

  const [alert, setAlert] = useState(null);
  let accessToken = localStorage.getItem("Access-Token");
  const inputChange = (name, value) => {
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmpassword") setConfirmPassword(value);
  };

  const isButtonDisabled = () => {
    if (
      emailInfo != null ||
      passwordInfo != null ||
      confirmPasswordInfo != null
    ) {
      return true;
    } else {
      return false;
    }
  };
  const closeAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    document.title = "Update Profile| AnonyMsg ";
  }, []);

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

  const handleUpdateClick = async (event) => {
    event.preventDefault();

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

    if (email && password) {
      const userData = {
        email: email.trim(),
        password: password,
      };

      try {
        const response = await fetch(`${BASE_URL}/users/update`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(userData), // body data type must match "Content-Type" header
        });
        if (response.status === 201) {
          setAlert({
            type: "success",
            title: "Success!",
            content: "You have successfully updated your profile.",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
          return;
        }
        if (response.status === 401 || 403) {
          setAlert({
            type: "error",
            title: "Unauthorized",
            content: "No token found to authorize this operation.",
            buttonName: "Close",
            clickEvent: closeAlert,
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
        } else {
          setAlert({
            type: "error",
            title: "Error",
            content: "Something went wrong.",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
          return;
        }
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          content: "An Error has occurred.",
          buttonName: "Close",
          clickEvent: closeAlert,
        });
        return;
      }
    }
  };
  return (
    <>
      <Form title="Update Profile Infor">
        <form autoComplete="on" className="box-form">
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
            onClick={handleUpdateClick}
            type="submit"
          >
            Update
          </Button>
        </form>
      </Form>
      {alert && <AlertBox {...alert} />}
    </>
  );
};

export default UpdateProfile;
