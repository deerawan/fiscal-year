import * as moment from 'moment';

export interface FiscalYear {
  month: number;
  day: number;
}

const JANUARY = 0;
const monthYearFormat = (date: moment.Moment) => date.format('YYYY-MM-DD');

const FiscalYear = function(fiscalYear: FiscalYear) {
  function getTaxMonths(taxYear: number) {
    let startTaxYear = taxYear;
    if (!isCalendarYear()) {
      --startTaxYear;
    }

    const startMonth = moment.utc({ year: startTaxYear,
      month: fiscalYear.month, day: fiscalYear.day });
    const ranges = [monthYearFormat(startMonth)];

    for (let i = 0; i < 11; i++) {
      const month = startMonth.add(1, 'month');
      ranges.push(monthYearFormat(month));
    }

    return ranges;
  }

  function getQuarter(inputDate: string) {

  }

  function isCalendarYear() {
    return fiscalYear.month === JANUARY && fiscalYear.day === 1;
  }

  return {
    getTaxMonths
  }
};

export default FiscalYear;
