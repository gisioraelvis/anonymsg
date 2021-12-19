import React from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  .input-wrapper {
    .icon-input {
      border-radius: 5rem;
      background-color: var(--tertiary-background);
      input {
        font-size: 1rem;
        width: 80%;
        border-radius: 5rem;
        background-color: var(--tertiary-background);
        border: none;
        padding: 0.8rem 0 0.8rem 0.5rem;
        color: var(--font-color-primary);
        &:focus {
          outline: none;
        }
        &::placeholder {
          font-size: 0.8rem;
          margin-right: 0.5rem;
          opacity: 0.8;
          color: var(--font-color-secondary);
        }
      }
    }
    label {
      font-size: 1rem;
      opacity: 0.8;
      font-weight: 600;
    }
    div {
      position: relative;
      margin: 0.5rem 0 0.5rem 0;
      .first-icon {
        color: #498afb;
      }
      .second-icon {
        color: #9166cc;
      }
      .third-icon {
        color: #fa8142;
      }
      .success-msg {
        color: var(--success-color);
      }
      .warning-msg {
        color: var(--warning-color);
      }
      .error-msg {
        color: var(--error-color);
      }
    }
  }

  .input-warning {
    input {
      box-shadow: 0px 0px 4px var(--warning-color);
    }
    i {
      color: var(--warning-color);
    }
  }

  .input-error {
    input {
      box-shadow: 0px 0px 4px var(--error-color);
    }
    i {
      color: var(--error-color);
    }
  }

  p {
    font-size: 0.8rem;
    padding: 0;
  }
`;

const Input = ({ icon, title, type, name, inputChange, value, info }) => {
  const handleInputChange = (e) => {
    e.preventDefault();
    inputChange(name, e.target.value);
  };

  return (
    <>
      <StyledInput>
        <div
          className={`input-wrapper ${
            info && (info.type === "error" ? "input-error" : "input-warning")
          }`}
        >
          <label htmlFor={name}>{title}</label>
          <div className="icon-input">
            <i
              className={`fa ${
                info
                  ? info.type === "error"
                    ? "fa-exclamation-circle"
                    : "fa-exclamation-triangle"
                  : icon
              }`}
            ></i>
            <input
              type={type}
              name={name}
              placeholder={title}
              onChange={handleInputChange}
              value={value}
            />
          </div>
          {info &&
            (info.type === "error" ? (
              <p className="error-msg">{info.msg}</p>
            ) : (
              <p className="warning-msg">{info.msg}</p>
            ))}
        </div>
      </StyledInput>
    </>
  );
};

export default Input;
