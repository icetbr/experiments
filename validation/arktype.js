"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var arktype_1 = require("arktype");
exports.user = (0, arktype_1.type)({
    name: "string",
    device: {
        platform: "'android'|'ios'",
        "version?": "number"
    }
});
