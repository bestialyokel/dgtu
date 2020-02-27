"use strict";
exports.__esModule = true;
var list_1 = require("./list");
var Task = /** @class */ (function () {
    function Task(amount, each, log) {
        var _this = this;
        if (log === void 0) { log = false; }
        this.log_deletion = function (who) {
            console.log(who + " was deleted(killed)");
        };
        this.find_last = function () {
            var begin = _this.list.begin();
            var end = _this.list.end();
            while (_this.list.size() != 1) {
                for (var i = 0; i < _this.each; i++)
                    begin = begin["++"]();
                _this.list.remove(begin);
                if (_this.log)
                    _this.log_deletion(begin.getValue().toString());
            }
            return _this.list.begin().getValue();
        };
        this.log = log;
        this.each = each;
        this.list = new list_1["default"]();
        if (amount < 1)
            throw "bad amount";
        if (each < 1)
            throw "bad each";
        for (var i = 0; i < amount; i++)
            this.list.push_back(i);
    }
    return Task;
}());
exports["default"] = Task;
