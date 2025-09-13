"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const notesController_1 = require("../controllers/notesController");
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
const noteSchema = {
    title: {
        in: ["body"], // 👈 подсказка TS, что это именно Location[]
        isString: {
            errorMessage: "title must be a string",
        },
        trim: true,
        notEmpty: { errorMessage: "title is required" },
        isLength: {
            options: { max: 255 },
            errorMessage: "max 255 characters",
        },
    },
    content: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "content must be a string",
        },
    },
};
router.get("/", notesController_1.getAllNotes);
router.get("/:id", notesController_1.getNoteById);
router.post("/", (0, express_validator_1.checkSchema)(noteSchema), validate_1.validate, notesController_1.createNote);
router.put("/:id", (0, express_validator_1.checkSchema)(noteSchema), validate_1.validate, notesController_1.updateNote);
router.delete("/:id", notesController_1.deleteNote);
exports.default = router;
