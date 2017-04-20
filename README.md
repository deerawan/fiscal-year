# Fiscal Year 📉
Library to deal with fiscal year.
Features:
- get fiscal year
- get fiscal month
- get fiscal quarter

## Install
```
$ npm install fiscal-year
```

## Usage

```js
const FiscalYear = require('fiscal-year');

const JUL_1 = { month: 6, day: 1 } // month is zero-based index
const inputDate = '2017-10-01';

const fiscalYear = FiscalYear(JUL_1);
fiscalYear.getFiscalYear(inputDate); // 2018
fiscalYear.getFiscalQuarter(inputDate); // 2
fiscalYear.getFiscalMonth(inputDate); // 9
```

## API

### FiscalYear(fiscalYearStart)
constructor

### getFiscalYear(date)
given a date, returns fiscal year

### getFiscalQuarter(date)
given a date, returns fiscal quarter

### getFiscalMonth(date)
given a date, returns fiscal month in zero-based month index

## License
MIT © [Budi Irawan](https://budiirawan.com)
