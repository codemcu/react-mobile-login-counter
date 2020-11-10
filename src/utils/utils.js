export const emailFormat = new RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*){2,3}|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/
);

export const passwordFormat = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4}$/
);
