import Joi from "joi";
import _ from "lodash";
import mongoose from "mongoose";
import { BadRequestError } from "./error/badRequestError";

export const mongodbIdValidator = (value, helpers) => {
  if (value != ',' && !value.includes('{') && !mongoose.isValidObjectId(value)) {
    return helpers.message(`please use valid id`);
  }
  return value;
};

export const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["params", "query", "body", "files"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false, dateFormat: "utc" })
    .validate(object);

  if (error) {
    const error_to_log = _.omit(error, "_original.files");
    console.log(`Joi Validation errors: ${JSON.stringify(error_to_log)}`);
    const errorMessage = _.map(error.details, "message").join(", ");
    const error_messages = {};
    const error_fields = _.union(
      _.map(error.details, (detail) => {
        if (detail.context.key) {
          error_messages[detail.context.key] = detail.message;
          return detail.context.key;
        }
        return _.last(detail.path);
      })
    );
    return next(new BadRequestError(errorMessage, error_fields, error_messages));
  }
  Object.assign(req, value);
  return next();
};