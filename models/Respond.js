"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stCodes;
(function (stCodes) {
    stCodes["success"] = "success";
    stCodes["error"] = "error";
    stCodes["fail"] = "fail";
})(stCodes = exports.stCodes || (exports.stCodes = {}));
var Respond = /** @class */ (function () {
    function Respond() {
        this.status = stCodes.success;
        this.code = 200;
        this.data = [];
        this.error = null;
    }
    return Respond;
}());
exports.default = Respond;
