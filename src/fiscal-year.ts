import * as moment from 'moment';

export interface FiscalYearStart {
  month: number;
  day: number;
}

const JANUARY = 0;
const NON_LEAP_YEAR = 2015;
const monthYearFormat = (date: moment.Moment) => date.format('YYYY-MM-01');

const FiscalYear = function(fiscalYearStart: FiscalYearStart) {
  function getFiscalMonths(fiscalYear: number) {
    let startTaxYear = fiscalYear;
    if (!isCalendarYearStart()) {
      --startTaxYear;
    }

    const startMonth = moment.utc({ year: startTaxYear,
      month: fiscalYearStart.month, day: fiscalYearStart.day });
    const ranges = [monthYearFormat(startMonth)];

    const REST_OF_MONTHS = 11;

    for (let i = 0; i < REST_OF_MONTHS; i++) {
      const month = startMonth.add(1, 'month');
      ranges.push(monthYearFormat(month));
    }

    return ranges;
  }

  function getFiscalMonth(inputDate: string): number {
    const inputDateMonth = moment.utc(inputDate).month();
    const fiscalMonths = getPivotFiscalMonths();

    return fiscalMonths.indexOf(inputDateMonth);
  }

  function getFiscalYear(inputDate: string): number {
    const inputDateYear = moment.utc(inputDate).year();
    if (isCalendarYearStart()) {
      return inputDateYear;
    }

    const pivotFiscalDate = getPivotFiscalDate(inputDateYear);

    if (moment.utc(inputDate).isBefore(pivotFiscalDate)) {
      return inputDateYear;
    }

    return inputDateYear + 1;
  }

  function getPivotFiscalDate(inputDateYear: number): moment.Moment {
    return moment
      .utc({
        years: inputDateYear,
        months: fiscalYearStart.month,
        dates: fiscalYearStart.day,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
  }

  function getPivotFiscalMonths() {
    const MAX_MONTHS = 12;
    const pivots = [];

    if (isCalendarYearStart()) {
      for (let i = 0; i < MAX_MONTHS; i++) {
        pivots.push(i);
      }

      return pivots;
    }

    // if start month is 7, generate 7, 8, 9, 10, 11
    for (let i = fiscalYearStart.month; i < MAX_MONTHS; i++) {
      pivots.push(i);
    }

    // then generate 0, 1, 2, 3, 4, 5, 6
    for (let i = 0; i < fiscalYearStart.month; i++) {
      pivots.push(i);
    }

    return pivots;
  }

  function isCalendarYearStart() {
    return fiscalYearStart.month === JANUARY && fiscalYearStart.day === 1;
  }

  return {
    getFiscalMonths,
    getFiscalYear,
    getFiscalMonth,
  };
};

export default FiscalYear;
