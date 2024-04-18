const fs = require("fs");

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

// Validates name input -> if it is missing, if it is a string or not and its length
const validateName = (name) => {
  if (!name) return "Name is missing";
  if (typeof name !== "string") return "Name must be a string!";
  if (name.trim().length > 15 || name.trim().length < 4)
    return "Name must be between 4 and 15 characters long!";
  return false;
};

// Validates height input property
const validateHeight = (min_height, max_height) => {
  if (!min_height) return "min_height is missing!";
  if (!max_height) return "max_height is missing!";
  if (typeof min_height !== "number") return "min_height must be a number!";
  if (typeof max_height !== "number") return "max_height must be a number!";
  if (
    min_height > 120 ||
    min_height < 1 ||
    max_height > 120 ||
    max_height < 1
  ) {
    return "Height must be between 1 and 120";
  }
  if (max_height < min_height)
    return "max_height must be higher than min_height";
  return false;
};

// Validates weight input property
const validateWeight = (min_weight, max_weight) => {
  if (!min_weight) return "min_weight is missing!";
  if (!max_weight) return "max_weight is missing!";
  if (typeof min_weight !== "number") return "min_weight must be a number!";
  if (typeof max_weight !== "number") return "max_weight must be a number!";
  if (
    min_weight > 100 ||
    min_weight < 1 ||
    max_weight > 100 ||
    max_weight < 1
  ) {
    return "Weight must be between 1 and 100";
  }
  if (max_weight < min_weight)
    return "max_weight must be higher than min_weight";
  return false;
};

// Validates life span input property
const validateLifeSpan = (min_life_span, max_life_span) => {
  if (!min_life_span) return "min_life_span is missing";
  if (!max_life_span) return "max_life_span is missing";
  if (typeof min_life_span !== "number")
    return "min_life_span must be a number!";
  if (typeof max_life_span !== "number")
    return "max_life_span must be a number!";
  if (
    min_life_span > 25 ||
    min_life_span < 1 ||
    max_life_span > 25 ||
    min_life_span < 1
  ) {
    return "Life Span must be between 1 and 30";
  }
  if (max_life_span < min_life_span)
    return "max_life_span must be higher than min_life_span";
  return false;
};

const validateImageSize = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      const fileSizeInBytes = stats.size;

      const fileSizeInMb = fileSizeInBytes / (1024 * 1024);

      if (fileSizeInMb > 2) {
        resolve("File must be up to 2mb!");
      }

      return resolve(false);
    });
  });
};

const check = (headers) => {
  return (buffers, options = { offset: 0 }) =>
    headers.every(
      (header, index) => header === buffers[options.offset + index]
    );
};

const validateFileType = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Convert data to ArrayBuffer
      const arrayBuffer = data.buffer.slice(0, 8);

      const uint8Array = new Uint8Array(arrayBuffer);

      // Use the 'arrayBuffer' here as needed
      const isPNG = check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const isJPEG = check([0xff, 0xd8, 0xff]);

      if (isPNG(uint8Array) === false && isJPEG(uint8Array) === false) {
        resolve("File format not allowed! Only JPG or PNG...");
      }

      return resolve(false);
    });
  });
};

module.exports = {
  convertTemperamentsToArray,
  validatePage,
  validateId,
  validateName,
  validateHeight,
  validateWeight,
  validateLifeSpan,
  validateFileType,
  validateImageSize,
};
