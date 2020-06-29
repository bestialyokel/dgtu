"use strict";
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
var domainError_1 = require("./domainError");
var ResourceNotFoundError = /** @class */ (function (_super) {
    __extends(ResourceNotFoundError, _super);
    function ResourceNotFoundError(details, query) {
        var _this = _super.call(this, "Data is not valid: " + details) || this;
        _this.data = { details: details, query: query };
        return _this;
    }
    return ResourceNotFoundError;
}(domainError_1["default"]));
exports["default"] = ResourceNotFoundError;
