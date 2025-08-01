export const validateAdminLogin = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};


export const validateUserLogin = ( password,username) => {
  const errors = {};

  if (!password) {
    errors.password = "Password is required";
  }

  
  if (!username) {
    errors.username = "Username is required";
  }
  return errors;
};
