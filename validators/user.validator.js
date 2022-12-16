import Joi, { custom } from "joi";
import { mongodbIdValidator } from "../helpers/custom.validation";

export const addUser = {
    body: {
        name: Joi.string().trim(true).required(),
        email: Joi.string().trim(true).required(),
        phone: Joi.string().trim(true).required()
    }
};


export const updateUser = {
    body: {
        name: Joi.string().trim(true).optional(),
        email: Joi.string().trim(true).optional(),
        phone: Joi.string().trim(true).optional()

    }
};

export const userParams = {
    params: {
        id: Joi.string().custom(mongodbIdValidator).optional()
    }
}