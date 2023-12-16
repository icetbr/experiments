"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var valibot_1 = require("valibot"); // 0.63 kB
// Valibot
var LoginSchema = (0, valibot_1.object)({
    email: (0, valibot_1.string)(valibot_1.email),
    password: (0, valibot_1.string)(),
});
