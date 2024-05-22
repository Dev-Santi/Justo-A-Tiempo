"use strict";
var Calendar = /** @class */ (function () {
    function Calendar(year, dates) {
        if (dates.length != 12) {
            throw new Error('No se puede inicializar un año con menos o más de 12 meses.');
        }
        this.year = year;
        this.dates = dates;
    }
    Calendar.prototype.getYear = function () {
        return this.year;
    };
    Calendar.prototype.getDates = function () {
        return this.dates;
    };
    Calendar.prototype.getMonth = function (i) {
        if (i < 0 || i >= 12) {
            throw new Error('El indice del mes buscado no es valido.');
        }
        return this.getDates()[i];
    };
    return Calendar;
}());
