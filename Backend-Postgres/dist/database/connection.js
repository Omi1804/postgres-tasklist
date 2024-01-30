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
exports.getClient = void 0;
const pg_1 = require("pg");
const DB_URI = process.env.DB_URI;
if (!DB_URI) {
    console.log("Please Define Postgres String");
}
function getClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client(DB_URI);
        try {
            yield client.connect();
            console.log("Database Connection established!");
            return client;
        }
        catch (error) {
            console.log("Error connecting to database " + error.message);
            throw error;
        }
    });
}
exports.getClient = getClient;
