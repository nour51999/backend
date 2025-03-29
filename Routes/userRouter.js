
import express from "express";
import { getCurrentUser,getApplicationStats,updateUser } from "../controllers/userController.js"
import { authorizePermissions } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/current-user',getCurrentUser)
router.get('/admin/app-stas',[authorizePermissions('admin'),getApplicationStats])
router.patch('/update-user',updateUser)


export default router;