"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typebox_1 = require("@sinclair/typebox");
var T = typebox_1.Type.Object({
    x: typebox_1.Type.String({ minLength: 1 }),
    y: typebox_1.Type.Number(),
    z: typebox_1.Type.Number()
});
