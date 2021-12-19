import React, { useState, useEffect } from "react";
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import StyledCard from "../components/Card";
import { StyledMessagePageStyles } from "../components/StyledSendMsgPage";
import { BASE_URL } from "../Helpers/constants";

const SendMessage = ({ match, history }) => {
  const { username } = match.params;
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(null);

  const handleMessageText = (e) => {
    setButtonDisabled(false);
    e.preventDefault();
    setMessage(e.target.value);
  };

  const closeAlert = () => {
    history.push("/");
    setAlert(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (username !== null) {
      try {
        const response = await fetch(`${BASE_URL}/users/?username=${username}`);
        const serverData = await response.json();

        if (response.status === 200) {
          setName(serverData.username);
          document.title = `Send Anonymous Message to ${serverData.username} | AnonyMsg`;
          return;
        }

        if (!response.ok && response.status === 404) {
          history.push("/404");
          return;
        } else if (response.status === 500) {
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
            content: "Something went wrong",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
          return;
        }
      } catch (error) {
        console.log(error);
        setAlert({
          type: "error",
          title: "Error",
          content: "An error has occurred",
          buttonName: "Close",
          clickEvent: closeAlert,
        });
      }
    }
  };
  const messageBody = { username, message };

  const handleSendClick = async () => {
    if (!message) {
      setButtonDisabled(true);
      return;
    } else {
      try {
        const response = await fetch(`${BASE_URL}/send`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(messageBody), // body data type must match "Content-Type" header
        });

        if (response.status === 200) {
          setAlert({
            type: "success",
            title: "Send!",
            content: "Your message has been send successfully",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
          return;
        }

        if (!response.ok && response.status === 500) {
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
            content: "Something went wrong",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
          return;
        }
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          content: "Something went wrong.",
          buttonName: "Close",
          clickEvent: closeAlert,
        });
      }
    }
  };

  /*
  const sendMsg = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/sendmessage`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(message), // body data type must match "Content-Type" header
      });

      if (response.status === 200) {
        setAlert({
          type: "success",
          title: "Send!",
          content: "Your message has been send successfully",
          buttonName: "Close",
          clickEvent: closeAlert,
        });
      }

      if (!response.ok && response.status === 500) {
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
          content: "Something went wrong",
          buttonName: "Close",
          clickEvent: closeAlert,
        });
        return;
      }
    } catch (error) {
      setAlert({
        type: "error",
        title: "Error",
        content: "Something went wrong.",
        buttonName: "Close",
        clickEvent: closeAlert,
      });
    }
  }; */

  return (
    <>
      <StyledCard height="70vh" width="80vw" margin="5px">
        <StyledMessagePageStyles>
          <div className="send-msg-content">
            <div className="head">
              <h2>Send Message</h2>
              <p>
                Send an anonymous message to{" "}
                <span className="user-name">
                  {name !== null && name !== undefined
                    ? name
                    : "Username Not Found"}
                </span>
              </p>
            </div>
            <div className="message-input">
              <textarea
                className={isButtonDisabled ? "input-warning" : ""}
                name="message"
                id=""
                onChange={handleMessageText}
                defaultValue={message}
                placeholder={
                  isButtonDisabled ? "Message cannot be empty" : "Your Message"
                }
              ></textarea>
              <div>
                <Button
                  bgcolor="secondary-color"
                  disabled={isButtonDisabled}
                  className="btn primary-btn"
                  onClick={handleSendClick}
                >
                  <i className="fas fa-envelope"></i>
                  &nbsp;&nbsp;Send&nbsp;Message
                </Button>
              </div>
            </div>
            {alert && <AlertBox {...alert} />}
          </div>
        </StyledMessagePageStyles>
      </StyledCard>
    </>
  );
};

export default SendMessage;
