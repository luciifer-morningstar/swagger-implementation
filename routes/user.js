import express from "express";
import { userController } from "../controllers";
import { validate } from "../helpers/custom.validation";
import { userValidator } from "../validators";
const router = express.Router({ mergeParams: true });

router.get("/get_with_paginate", userController.getWithPagination); //Get all users list
router.get("/:id", validate(userValidator.userParams), userController.getById); //Get user By Id
router.post("/create", validate(userValidator.addUser), userController.create); //Create user
router.put("/:id", validate(userValidator.updateUser), userController.updateById);   //Update user by id
router.delete("/:id", validate(userValidator.userParams), userController.deleteById); // Delete user by id

/**
 * @swagger
 * /api/user/get_with_paginate:
 *   get:
 *     tags: 
 *        - User
 *     summary: Get all data with pagination
 *     description: Retrieve a list of data.
 *     parameters:
 *      - in: query
 *        name: filter
 *        schema:
 *          type: object
 *          example:
 *           limit: 10
 *           currentPage: 1
 *     responses:  
 *       200: 
 *         description: Success
 *       401:
 *         description: Not authenticated
*/
  
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags: 
 *        - User
 *     summary: Get data from id
 *     description: Retrieve a data from id.
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            required: true
 *     responses:  
 *       200: 
 *         description: Success
 *       401:
 *         description: Not authenticated
*/
  
/** 
 * @swagger 
 * /api/user/create:
 *   post: 
 *     tags: 
 *        - User
 *     summary: Create new user
 *     description: Create new user. 
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - phone
 *            properties:
 *              name:
 *                type: string
 *                default: xyz
 *              email:
 *                type: string
 *                default: xyz@gmail.com
 *              phone:
 *                type: string
 *                default: 1234567890
 *     responses:  
 *       201: 
 *         description: Created  
 */

/** 
 * @swagger 
 * /api/user/{id}:
 *   put: 
 *     tags: 
 *        - User
 *     summary: Update existing data
 *     description: Update existing data.
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - phone
 *            properties:
 *              name:
 *                type: string
 *                default: xyz
 *              email:
 *                type: string
 *                default: xyz@gmail.com
 *              phone:
 *                type: string
 *                default: 1234567890
 *     responses:  
 *       201: 
 *         description: Updated  
 */

/** 
 * @swagger 
 * /api/user/{id}:
 *   delete: 
 *     tags: 
 *        - User
 *     summary: Delete existing user
 *     description: Delete existing user.
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id
 *     responses:  
 *       201: 
 *         description: Deleted  
 */

export default router;
