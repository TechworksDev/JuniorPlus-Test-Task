"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
const db_1 = __importDefault(require("../db"));
const getAllNotes = async (_req, res, next) => {
    try {
        const result = await db_1.default.query("SELECT id, title, content, created_at, updated_at FROM notes ORDER BY created_at DESC");
        res.json(result.rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllNotes = getAllNotes;
const getNoteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db_1.default.query("SELECT id, title, content, created_at, updated_at FROM notes WHERE id = $1", [id]);
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Note not found" });
        res.json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
};
exports.getNoteById = getNoteById;
const createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const result = await db_1.default.query("INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at, updated_at", [title, content]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
};
exports.createNote = createNote;
const updateNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const result = await db_1.default.query("UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING id, title, content, created_at, updated_at", [title, content, id]);
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Note not found" });
        res.json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        await db_1.default.query("DELETE FROM notes WHERE id = $1", [id]);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteNote = deleteNote;
