const authController = require("../controllers/authController")
import { Router } from "express"
import { authMiddleware } from "../middleware/authMiddleware"
const router = Router()

router.post('/register', authMiddleware, authController.registerUser)
router.post('/login', authMiddleware, authController.loginUser)

export default router