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

module.exports = {
  convertTemperamentsToArray,
  validatePage,
};
