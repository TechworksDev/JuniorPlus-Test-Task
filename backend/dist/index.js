"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const notes_1 = __importDefault(require("./routes/notes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Swagger
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Роуты
app.use("/api/notes", notes_1.default);
app.listen(3000, () => {
    console.log("Notes backend listening on port 3000");
});
