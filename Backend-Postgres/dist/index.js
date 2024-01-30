"use strict";
//creating the todos in which every user has there own todos
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const PORT = process.env.PORT;
const models_1 = require("./models");
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/auth", routes_1.userRoutes);
app.use("/todo", routes_1.todoRoutes);
//database connection
const initDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, models_1.createUserTable)();
        yield (0, models_1.createTodoTable)();
        console.log("Database initialized");
    }
    catch (err) {
        console.log("Could not connect to database" + err);
        process.exit(1);
    }
});
app.listen(PORT || 8080, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Backend listening on port " + PORT);
    yield initDb();
}));
