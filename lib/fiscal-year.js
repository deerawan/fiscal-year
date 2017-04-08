"use strict";
exports.__esModule = true;
var moment = require("moment");
var JANUARY = 0;
var monthYearFormat = function (date) { return date.format('YYYY-MM-DD'); };
var FiscalYear = function (fiscalYear) {
    function getTaxMonths(taxYear) {
        var startTaxYear = taxYear;
        if (!isCalendarYear()) {
            --startTaxYear;
        }
        var startMonth = moment.utc({ year: startTaxYear,
            month: fiscalYear.month, day: fiscalYear.day });
        var ranges = [monthYearFormat(startMonth)];
        for (var i = 0; i < 11; i++) {
            var month = startMonth.add(1, 'month');
            ranges.push(monthYearFormat(month));
        }
        return ranges;
    }
    function getQuarter(inputDate) {
    }
    function isCalendarYear() {
        return fiscalYear.month === JANUARY && fiscalYear.day === 1;
    }
    return {
        getTaxMonths: getTaxMonths
    };
};
exports["default"] = FiscalYear;
