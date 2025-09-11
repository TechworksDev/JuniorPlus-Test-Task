import authController from "../controllers/authController"
import { Router } from "express"
import { authMiddleware } from "../middleware/authMiddleware"
const router = Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.delete('/delete', authMiddleware, authController.deleteUser)
router.put('/updateProfile', authMiddleware, authController.updateProfile)

export default router