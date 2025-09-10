const authController = require("../controllers/authController")
import { Router } from "express"
const router = Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)

export default router