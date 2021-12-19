export const isUserAunthenticated = () => {
  return localStorage.getItem("Access-Token") ? true : false;
};
