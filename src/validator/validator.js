let validatefield = (constraints, value) => {
  console.log("in validate");
  if (constraints.required && value === "") {
    return "Required";
  }
  if (constraints.minLength) {
    if (constraints.minLength > value.length) {
      return "PLease provide atleast " + constraints.minLength + " characters.";
    }
  }
  if (constraints.maxLength) {
    if (constraints.maxLength < value.length) {
      return "PLease provide atmost " + constraints.maxLength + " characters.";
    }
  }

  if (constraints.regexp) {
    let pattern = constraints["regexp"];
    if (!pattern.test(value)) {
      return "Invalid value";
    }
  }
  if (constraints.minValue) {
    if (constraints.minValue > value) {
      return "Value should be greater than " + constraints.minValue;
    }
  }
  if (constraints.maxValue) {
    if (constraints.maxValue < value) {
      return "Value should be lesser than " + constraints.maxValue;
    }
  }
  /* eslint-disable */

  if (constraints.email) {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      return "Invalid Email";
    }
  } else if (constraints.url) {
    if (
      !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
        value
      )
    ) {
      return "Passwords mismatched";
    }
  } else if (constraints.password) {
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)) {
      return "Password must have a capital letter, small letter, numerical value ,special character and must be 6 to 16 characters long.";
    }
  }
  if (constraints.matchWith) {
    if (constraints.matchWith !== value) {
      return "Passwords mismatched";
    }
  }
  return "valid";
};

export default validatefield;
