import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
import { userService } from "../services";

export const getWithPagination = async (req, res) => {
    try{
        const { limit, currentPage } = req.query;
        let data = await userService.getWithPagination(req.query, {limit:parseInt(limit ?? 1), page:parseInt(currentPage ?? 1)}, {published:-1})
        return successResponse(req, res, data);
     }catch(error){
         return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
     }
}

export const getById = async (req, res) => {
    try{
        const { id } = req.params;
        let data = await userService.getById(id)
        return successResponse(req, res, data);
     }catch(error){
        console.log("err", error)
         return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
     }
}

export const deleteById = async (req, res) => {
    try{
        const { id } = req.params;
        let data = await userService.deleteById(id)
        return successResponse(req, res, data);
     }catch(error){
        console.log("err", error)
         return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
     }
}

export const create = async (req, res) => {
    try {
        const data = await userService.create(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        console.log(error);
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

export const updateById = async (req, res) => {
    try {
        let {id} = req?.params;
        const updatedData = await userService.updateById(id, req.body)
        return successResponse(req, res, updatedData);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};