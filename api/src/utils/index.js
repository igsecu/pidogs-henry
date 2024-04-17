// Convert temperaments String to Array
const convertTemperamentsToArray = (temperaments) => {
  const temperamentsArray = [];
  temperaments
    .split(", ")
    .forEach((i) => temperamentsArray.push(i.toUpperCase()));
  return temperamentsArray;
};

// Validates page
const validatePage = (page) => {
  if (page !== "0" && !parseInt(page)) {
    return true;
  }
  return false;
};

// Regular expression to check if string is a valid UUID
const regexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

// Validate id
const validateId = (id) => {
  return regexExp.test(id);
};

module.exports = {
  convertTemperamentsToArray,
  validatePage,
  validateId,
};
