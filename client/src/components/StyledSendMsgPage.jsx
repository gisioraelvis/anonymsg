import styled from "styled-components";

const StyledMessagePageStyles = styled.div`
  .send-msg-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .head {
      text-align: center;
      p {
        margin-top: 0.2rem;
      }
      .user-name {
        white-space: nowrap;
      }
    }

    .message-input {
      justify-content: space-between;
      margin: 1rem 2rem;
      width: 90%;
      height: 100%;
      textarea {
        width: auto;
        padding: 3rem 4rem;
        font-size: 1rem;
        color: #fff;
        background-color: var(--tertiary-background);
        opacity: 1;
        border: none;
        border-radius: 0.5rem;
        &:focus {
          outline: none;
        }
        &::placeholder {
          font-size: 1rem;
          opacity: 0.8;
        }
      }
      .input-warning {
        box-shadow: 0px 0px 4px var(--warning-color);
      }

      label {
        font-size: 1.4rem;
        opacity: 0.8;
        font-weight: 600;
      }
    }
  }
`;

export { StyledMessagePageStyles };
