"use strict";
// index.ts
// This is the main entry point of our application
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => res.send('Hello World!'));
const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
