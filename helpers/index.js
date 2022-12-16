import _ from "lodash";

import { v4 as uuidv4 } from "uuid";

export const successResponse = (req, res, data, code = 200) =>
  res.status(code).send({
    code,
    data,
    success: true,
  });

export const errorResponse = (req, res, code = 500, errorMessage = "Something went wrong", error = {}, errorfields = {}) => {
  res.status(code).json({
    code,
    errorMessage,
    error,
    errorfields,
    success: false,
  });
};

export const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(", ")} are required fields.` : "";
};