"use strict";
/* https://rclayton.silvrback.com/custom-errors-in-node-js */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var DomainError = /** @class */ (function (_super) {
    __extends(DomainError, _super);
    function DomainError(message) {
        var _this = _super.call(this, message) || this;
        // Ensure the name of this error is the same as the class name
        _this.name = _this.constructor.name;
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return DomainError;
}(Error));
exports["default"] = DomainError;
