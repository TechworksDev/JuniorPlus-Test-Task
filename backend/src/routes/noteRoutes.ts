import noteController from "../controllers/noteController"
import { Router } from "express"
import { authMiddleware } from "../middleware/authMiddleware"
const router = Router()

router.get('/getNotes', authMiddleware, noteController.getNotes)
router.post('/addNote', authMiddleware, noteController.addNote)
router.delete('/removeNote', authMiddleware, noteController.removeNote)
router.put('/updateNote', authMiddleware, noteController.updateNote)

export default router