import { Router } from "express";
import * as DataController from '../controller/DataController.js'
import { validateCreateTodo, validateUpdateTodo } from "../Middleware/DataValidator.js";
import { IsAuthenticated } from "../Middleware/authMiddleware.js";
import { validateRequest } from "../Middleware/ValidateRequest.js";

const router = Router();
router.get('/', IsAuthenticated, DataController.getAllData)
router.post('/Data', validateCreateTodo, validateRequest , DataController.createData)
router.put('/Data/:id', validateUpdateTodo, IsAuthenticated, DataController.UpdateData)
router.delete('/Delete/:id', IsAuthenticated, DataController.DeleteData)


export default router

