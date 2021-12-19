import React, { useState, useEffect } from "react";
import StyledCard from "../components/Card";
import StyledDashBoard from "../components/StyledDashBoard";
import AlertBox from "../components/AlertBox";
import { BASE_URL } from "../Helpers/constants";
import SocialShare from "../components/SocialShare";
import { formatDate, sortByDate } from "../Helpers/utils";
import { useHistory } from "react-router";

const DashBoard = () => {
  const [userData, setUserData] = useState({ user: {}, messages: [] });
  const [alert, setAlert] = useState(null);
  const closeAlert = () => {
    setAlert(null);
  };

  const history = useHistory();
  const logoutUser = () => {
    setAlert(null);
    localStorage.removeItem("Access-Token");
    history.push("/login");
  };

  useEffect(() => {
    document.title = "DashBoard | AnonyMsg";
    let accessToken = localStorage.getItem("Access-Token");

    const fetchMessages = async (accessToken) => {
      if (accessToken !== null) {
        try {
          const response = await fetch(`${BASE_URL}/users/dashboard`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const serverData = await response.json();
          if (response.status === 200) {
            setUserData({
              user: { username: serverData.username },
              messages: serverData.usermessages
                ? serverData.usermessages.messages
                : "No messages",
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
            content: "An error has occurred",
            buttonName: "Close",
            clickEvent: closeAlert,
          });
        }
      } else {
        setAlert({
          type: "error",
          title: "Unauthorized",
          content: "No access token found",
          buttonName: "Close",
          clickEvent: logoutUser,
        });
        return;
      }
    };

    fetchMessages(accessToken);
  }, []);

  //Sort messages by date
  const sortedMessages = userData
    ? userData.messages
    : sortByDate(userData.messages);

  //username from userData.user.username if not null and not undefined
  const loggedInUserName = userData.user.username
    ? userData.user.username
    : "Loading...";

  return (
    <>
      <StyledCard height="80vh" width="85vw" margin="5px">
        <StyledDashBoard>
          <div className="user-profile">
            <div className="user-avatar">
              {loggedInUserName[0].toUpperCase()}
            </div>
            <h2>{loggedInUserName}</h2>
            <SocialShare
              /* if null or undefined else username */
              username={userData.user.username && userData.user.username}
            />
          </div>
          <div className="separator"></div>
          <div className="message-section">
            <h2 className="msg-section-header">Your Messages</h2>
            <div className="messages">
              {userData.messages !== "No messages" ? (
                sortedMessages.map((message) => {
                  return (
                    <div key={message._id} className="message">
                      {message.message}
                      <div className="date-time">
                        {formatDate(message.date)}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>
                  Your Inbox is Empty...
                  <p>Start sharing your links to get Anonymouse messages</p>
                </p>
              )}
            </div>
          </div>
        </StyledDashBoard>
      </StyledCard>
      {alert && <AlertBox {...alert} />}
    </>
  );
};

export default DashBoard;
