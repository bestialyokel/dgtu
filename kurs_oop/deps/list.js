"use strict";
exports.__esModule = true;
var node_1 = require("./node");
var IamClown = /** @class */ (function () {
    function IamClown(node) {
        var _this = this;
        //перегрузку не завезли...
        this["++"] = function () { return new IamClown(_this.node_please_dont_read_this_field.next); };
        this["--"] = function () { return new IamClown(_this.node_please_dont_read_this_field.prev); };
        this.equalTo = function (it) { return (_this.node_please_dont_read_this_field == it.node_please_dont_read_this_field); };
        this.getValue = function () { return _this.node_please_dont_read_this_field.value; };
        this.node_please_dont_read_this_field = node;
    }
    return IamClown;
}());
var List = /** @class */ (function () {
    function List() {
        var _this = this;
        this.size = function () { return _this.length; };
        this.begin = function () { return new IamClown(_this.front); };
        this.end = function () { return new IamClown(_this.back); };
        this.remove = function (it) { return _this._remove(it.node_please_dont_read_this_field); };
        this.push_back = function (value) { return _this.insert(_this.size(), value); };
        this.length = 0;
    }
    List.prototype._remove = function (node) {
        this.length -= 1;
        if (node == this.front)
            this.front = node.next;
        if (node == this.back)
            this.back = node.prev;
        if (node.prev != null)
            node.prev.next = node.next;
        if (node.next != null)
            node.next.prev = node.prev;
    };
    List.prototype.insert = function (index, value) {
        this.length += 1;
        //empty
        if (this.front == null) {
            this.front = this.back = new node_1["default"](value);
            return;
        }
        //single elem
        if (this.front == this.back) {
            if (index == 0)
                this.front = new node_1["default"](value);
            else
                this.back = new node_1["default"](value);
            this.front.next = this.front.prev = this.back;
            this.back.next = this.back.prev = this.front;
            return;
        }
        //as first
        if (index == 0) {
            var node = this.front;
            this.front = new node_1["default"](value);
            this.front.next = node;
            this.front.prev = this.back;
            node.prev = this.front;
            this.back.next = this.front;
        }
        //as last
        else if (index >= this.length - 1) {
            var node = this.back;
            this.back = new node_1["default"](value);
            this.back.prev = node;
            this.back.next = this.front;
            node.next = this.back;
            this.front.prev = this.back;
        }
        //between first&last
        else {
            var index_node = this.front;
            while (index-- > 0)
                index_node = index_node.next;
            var prev_node = index_node.prev;
            var new_node = new node_1["default"](value);
            index_node.prev = prev_node.next = new_node;
            new_node.next = index_node;
            new_node.prev = prev_node;
        }
    };
    List.prototype.print = function () {
        var node = this.front;
        console.log(node.value);
        node = node.next;
        while (node != this.front) {
            console.log(node.value);
            node = node.next;
        }
    };
    return List;
}());
exports["default"] = List;
