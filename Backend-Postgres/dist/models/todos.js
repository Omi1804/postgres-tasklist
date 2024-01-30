"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoTable = void 0;
const connection_1 = require("../database/connection");
const createTodoTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, connection_1.getClient)();
    const CreateTable = `
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id),
        done BOOLEAN DEFAULT FALSE
    )
  `;
    yield client.query(CreateTable);
    console.log("Todos table is created successfully!");
});
exports.createTodoTable = createTodoTable;
