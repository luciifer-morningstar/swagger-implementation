import { User } from "../models";
import { formatFilter } from "../config/filter";
import { formatPagination, formatPaginationResponse } from "../config/pagination";
import mongoose from "mongoose";
import ApiError from "../helpers/error/ApiError";
import httpStatus from "http-status";
import { ERROR } from "../helpers/response.message";

// ----------------------------------V2 API'S-----------------------------------------

export const getWithPagination = async (query, pagination, sort = {_id:-1}) => {
    try {
        let filters = [], newFilter = [], filter = {}, _query = [], result;
        let { user_id, name } = query;
        if (user_id) {
            filters.push({
                column_id: '_id',
                value: user_id,
                type: "OBJECTID"
            });
        }
        if (name) {
            filters.push({
                column_id: 'name',
                value: name,
                type: "TEXT"
            });
        }
        if (filters.length > 0) {
            newFilter = await formatFilter(filters);
            filter = { ...filter, $and: newFilter }
        }
        let paginationData = await formatPagination(pagination.limit, pagination.page);
            _query = [
                { $match: filter },
                { $sort: sort },
                { $skip:paginationData.skip},
                { $limit:paginationData.limit}
            ];
            result = await User.aggregate(_query);
            let totalCount = await User.countDocuments(filter);
            result = await formatPaginationResponse(pagination.limit, totalCount, result, pagination.page);
        return result;
    } catch (e) {
        console.log("error while getting data", e)
        throw e;
    }
};

export const deleteById = async (id) => {
    try {
        let result = await User.deleteMany({_id:mongoose.Types.ObjectId(id)});
        return id;
    } catch (e) {
        console.log("err while deleting", e);
        throw e;
    }
}

export const getById = async (...args) => {
    try{
        let id = args[0] ? mongoose.Types.ObjectId(args[0]) : '';
        let result = await User.aggregate([
            { $match: {_id: id} }
        ]);
        let data = {};
        data = result.length > 0 ? result[0] : {};
        if(!data || Object.keys(data).length < 1) throw new ApiError(httpStatus.NOT_FOUND, ERROR.USER.NOT_FOUND);
        return data;
    }catch(err){
        console.log("error while getting data by id", err)
        throw err;
    }
};

export const create = async (body) => {
    try {
        let result = await User.create(body);
        const updatedData = await getById(result?._id ?? result?._doc?._id);
        return updatedData ?? result;
    } catch (e) {
        console.log("err while create data", e);
        throw e;
    }
}

export const updateById = async (id, updateBody) => {
    try {
        let data = await User.findOne({ _id: id });
        if (!data || data == null) throw new ApiError(httpStatus.BAD_REQUEST, ERROR.USER.NOT_FOUND);
        let {name, email, phone} = updateBody;
        if (name) data.name = name;
        if (email) data.email = email;
        if (phone) data.phone = phone;
        await data.save();
        const updatedData = await getById(id);
        return updatedData;
    } catch (error) {
        console.log("error while updating data by id", error);
        throw error;
    }
}