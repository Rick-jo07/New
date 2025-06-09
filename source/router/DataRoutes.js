import { Router } from "express";
import * as DataController from '../controller/DataController.js'
import { IsAuthenticated } from "../Middleware/authMiddleware.js";

const router = Router();
router.get('/', IsAuthenticated, DataController.getAllData)
router.post('/Data', IsAuthenticated, DataController.createData)
router.put('/Data/:id', IsAuthenticated, DataController.UpdateData)
router.delete('/Delete/:id', IsAuthenticated, DataController.DeleteData)


export default router

