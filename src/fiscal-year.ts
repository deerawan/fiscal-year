import * as moment from 'moment';

export interface FiscalYearStart {
  month: number;
  day: number;
}

const JANUARY = 0;
const NON_LEAP_YEAR = 2015;
const monthYearFormat = (date: moment.Moment) => date.format('YYYY-MM-01');

const FiscalYear = function(fiscalYearStart: FiscalYearStart) {
  function getTaxMonths(taxYear: number) {
    let startTaxYear = taxYear;
    if (!isCalendarYearStart()) {
      --startTaxYear;
    }

    const startMonth = moment.utc({ year: startTaxYear,
      month: fiscalYearStart.month, day: fiscalYearStart.day });
    const ranges = [monthYearFormat(startMonth)];

    for (let i = 0; i < 11; i++) {
      const month = startMonth.add(1, 'month');
      ranges.push(monthYearFormat(month));
    }

    return ranges;
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

  function isCalendarYearStart() {
    return fiscalYearStart.month === JANUARY && fiscalYearStart.day === 1;
  }

  return {
    getTaxMonths,
    getFiscalYear,
  };
};

export default FiscalYear;
