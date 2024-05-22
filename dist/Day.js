"use strict";
var Day = /** @class */ (function () {
    function Day(name, date) {
        this.name = name;
        this.date = date;
    }
    Day.prototype.getName = function () {
        return this.name;
    };
    Day.prototype.getDate = function () {
        return this.date;
    };
    return Day;
}());
