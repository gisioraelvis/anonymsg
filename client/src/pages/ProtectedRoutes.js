function isUserLoggedIn (redirect) {
  return localStorage.getItem("Access-Token") === undefined ? "/login" : `/${redirect}`;
};
export default isUserLoggedIn;
