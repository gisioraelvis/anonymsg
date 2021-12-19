const validateUserName = (username) => {
  let regex = /^[0-9a-zA-Z]+$/;
  return username.match(regex);
};
//validate email
const validateEmail = (email) => {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regex);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

export { validatePassword, validateUserName, validateEmail };
