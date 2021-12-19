import styled from "styled-components";

const StyledDashBoard = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .user-profile {
    min-width: 13%;
    max-width: 20%;
    margin: 0 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .user-avatar {
      width: 10rem;
      height: 10rem;
      background-color: var(--tertiary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 5rem;
    }

    h2 {
      margin-top: 0 0.5rem;
      font-size: 16px;
    }

    .social-share {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .social-links {
        text-align: center;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        a {
          margin: 0 0.5rem;
          font-size: 3rem;
          transition: 0.3s;
          transition-property: filter, transform;
          &:hover {
            filter: brightness(1.3);
          }
          &:active {
            transform: translateY(2.5px);
          }
        }
        .fa-whatsapp {
          color: rgba(79, 206, 94, 0.747);
        }
        .fa-instagram {
          color: #e4405f;
        }
        .fa-facebook {
          color: rgb(83, 117, 192);
        }
        .fa-twitter {
          color: #55acee;
        }
        .fa-telegram {
          color: #0088cc;
        }
      }
      .btn {
        margin-top: 1rem;
      }
    }
  }
  .separator {
    height: 90%;
    width: 0.5rem;
    border-radius: 1rem;
    background-color: grey;
  }
  .message-section {
    height: 100%;
    margin-bottom: 1rem;
    .msg-section-header {
      text-align: center;
    }
    .messages {
      margin: 1rem 3rem;
      width: 90%;
      height: 80%;
      overflow-y: auto;
      .message {
        font-size: 1.2rem;
        text-align: start;
        border-radius: 0.5rem;
        box-shadow: 0px 0 10px 5px #0101012d;
        margin: 0.7rem;
        padding: 1rem;
        background-color: var(--tertiary-background);

        .date-time {
          text-align: end;
          font-size: 1rem;
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    .message-section {
      .messages {
        margin: auto;
      }
    }
  }
`;

export default StyledDashBoard;
