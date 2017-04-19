import FiscalYear from '../src/fiscal-year';
import * as chai from 'chai';

const expect = chai.expect;

describe('Fiscal Year', () => {
  const JAN_1 = { month: 0, day: 1 };
  const JUL_1 = { month: 6, day: 1 };
  const APR_6 = { month: 3, day: 6 };

  describe('#getFiscalMonths', function() {
    context('when fiscal year start is 1 JAN', () => {
      it('returns tax months from JAN - DEC', () => {
        const fiscalYear = FiscalYear(JAN_1);
        expect(fiscalYear.getFiscalMonths(2017)).to.eql([
         '2017-01-01',
         '2017-02-01',
         '2017-03-01',
         '2017-04-01',
         '2017-05-01',
         '2017-06-01',
         '2017-07-01',
         '2017-08-01',
         '2017-09-01',
         '2017-10-01',
         '2017-11-01',
         '2017-12-01',
        ]);
      });
    });

    context('when fiscal year start is 1 JUL', () => {
      it('returns fiscal months from JUL 2016 - JUNE 2017 for year 2017', () => {
        const fiscalYear = FiscalYear(JUL_1);
        expect(fiscalYear.getFiscalMonths(2017)).to.eql([
         '2016-07-01',
         '2016-08-01',
         '2016-09-01',
         '2016-10-01',
         '2016-11-01',
         '2016-12-01',
         '2017-01-01',
         '2017-02-01',
         '2017-03-01',
         '2017-04-01',
         '2017-05-01',
         '2017-06-01',
        ]);
      });
    });

    context('when fiscal year start is 6 APR', () => {
      it('returns fiscal months from APR 2016 - MARCH 2017 for year 2017', () => {
        const fiscalYear = FiscalYear(APR_6);
        expect(fiscalYear.getFiscalMonths(2017)).to.eql([
         '2016-04-01',
         '2016-05-01',
         '2016-06-01',
         '2016-07-01',
         '2016-08-01',
         '2016-09-01',
         '2016-10-01',
         '2016-11-01',
         '2016-12-01',
         '2017-01-01',
         '2017-02-01',
         '2017-03-01',
        ]);
      });
    });
  });

  describe('#getFiscalYear', function() {
    context('when fiscal year start is 1 JAN', function() {
      let fiscalYear: any;

      before(function() {
        fiscalYear = FiscalYear(JAN_1);
      });

      it('returns fiscal year same with the year of input date', function() {
        expect(fiscalYear.getFiscalYear('2014-01-01')).to.equal(2014);
        expect(fiscalYear.getFiscalYear('2014-03-03')).to.equal(2014);
        expect(fiscalYear.getFiscalYear('2014-06-07')).to.equal(2014);
        expect(fiscalYear.getFiscalYear('2014-06-30')).to.equal(2014);

        expect(fiscalYear.getFiscalYear('2015-01-01')).to.equal(2015);
        expect(fiscalYear.getFiscalYear('2015-08-20')).to.equal(2015);
        expect(fiscalYear.getFiscalYear('2015-12-31')).to.equal(2015);
      });
    });

    context('when fiscal year start is 1 JUL', function() {
      let fiscalYear: any;

      before(function() {
        fiscalYear = FiscalYear(JUL_1);
      });

      context('for input date before 1 JUL', function() {
        it('returns fiscal year same with the year of input date', function() {
          expect(fiscalYear.getFiscalYear('2014-01-01')).to.equal(2014);
          expect(fiscalYear.getFiscalYear('2014-03-03')).to.equal(2014);
          expect(fiscalYear.getFiscalYear('2014-06-07')).to.equal(2014);
          expect(fiscalYear.getFiscalYear('2014-06-30')).to.equal(2014);
        });
      });

      context('for input date is or after 1 JUL', function() {
        it('returns fiscal year as next year from input date year', function() {
          expect(fiscalYear.getFiscalYear('2014-07-01')).to.equal(2015);
          expect(fiscalYear.getFiscalYear('2014-07-02')).to.equal(2015);
          expect(fiscalYear.getFiscalYear('2014-11-28')).to.equal(2015);
          expect(fiscalYear.getFiscalYear('2015-12-23')).to.equal(2016);
          expect(fiscalYear.getFiscalYear('2016-07-16')).to.equal(2017);
        });
      });
    });

    context('when fiscal year start is 6 APR', function() {
      let fiscalYear: any;

      before(function() {
        fiscalYear = FiscalYear(APR_6);
      });

      context('for input date before 6 APR', function() {
        it('returns fiscal year same with the year of input date', function() {
          expect(fiscalYear.getFiscalYear('2014-01-01')).to.equal(2014);
          expect(fiscalYear.getFiscalYear('2014-02-01')).to.equal(2014);
          expect(fiscalYear.getFiscalYear('2014-03-03')).to.equal(2014);
          expect(fiscalYear.getFiscalYear('2014-04-05')).to.equal(2014);
        });
      });

      context('for input date is or after 6 APR', function() {
        it('returns fiscal year as next year from input date year', function() {
          expect(fiscalYear.getFiscalYear('2014-04-06')).to.equal(2015);
          expect(fiscalYear.getFiscalYear('2014-04-07')).to.equal(2015);
          expect(fiscalYear.getFiscalYear('2014-11-28')).to.equal(2015);
          expect(fiscalYear.getFiscalYear('2015-12-23')).to.equal(2016);
          expect(fiscalYear.getFiscalYear('2016-07-16')).to.equal(2017);
        });
      });
    });
  });

  describe('#getFiscalMonth', function() {
    context('when fiscal year start is 1 JAN', function() {
      it('returns correct fiscal month', function() {
        const fiscalYear = FiscalYear(JAN_1);

        expect(fiscalYear.getFiscalMonth('2017-01-01')).to.equal(0);
        expect(fiscalYear.getFiscalMonth('2017-02-01')).to.equal(1);
        expect(fiscalYear.getFiscalMonth('2017-03-01')).to.equal(2);
        expect(fiscalYear.getFiscalMonth('2017-04-01')).to.equal(3);
        expect(fiscalYear.getFiscalMonth('2017-05-01')).to.equal(4);
        expect(fiscalYear.getFiscalMonth('2017-06-01')).to.equal(5);
        expect(fiscalYear.getFiscalMonth('2017-07-01')).to.equal(6);
        expect(fiscalYear.getFiscalMonth('2017-08-01')).to.equal(7);
        expect(fiscalYear.getFiscalMonth('2017-09-01')).to.equal(8);
        expect(fiscalYear.getFiscalMonth('2017-10-01')).to.equal(9);
        expect(fiscalYear.getFiscalMonth('2017-11-01')).to.equal(10);
        expect(fiscalYear.getFiscalMonth('2017-12-01')).to.equal(11);
      });
    });

    context('when fiscal year start is 1 JUL', function() {
      it('returns correct fiscal month', function() {
        const fiscalYear = FiscalYear(JUL_1);

        expect(fiscalYear.getFiscalMonth('2017-07-01')).to.equal(0);
        expect(fiscalYear.getFiscalMonth('2017-08-01')).to.equal(1);
        expect(fiscalYear.getFiscalMonth('2017-09-01')).to.equal(2);
        expect(fiscalYear.getFiscalMonth('2017-10-01')).to.equal(3);
        expect(fiscalYear.getFiscalMonth('2017-11-01')).to.equal(4);
        expect(fiscalYear.getFiscalMonth('2017-12-01')).to.equal(5);
        expect(fiscalYear.getFiscalMonth('2017-01-01')).to.equal(6);
        expect(fiscalYear.getFiscalMonth('2017-02-01')).to.equal(7);
        expect(fiscalYear.getFiscalMonth('2017-03-01')).to.equal(8);
        expect(fiscalYear.getFiscalMonth('2017-04-01')).to.equal(9);
        expect(fiscalYear.getFiscalMonth('2017-05-01')).to.equal(10);
        expect(fiscalYear.getFiscalMonth('2017-06-01')).to.equal(11);
      });
    });

    context('when fiscal year start is 6 APR', function() {
      it('returns correct fiscal month', function() {
        const fiscalYear = FiscalYear(APR_6);

        expect(fiscalYear.getFiscalMonth('2017-04-01')).to.equal(0);
        expect(fiscalYear.getFiscalMonth('2017-05-01')).to.equal(1);
        expect(fiscalYear.getFiscalMonth('2017-06-01')).to.equal(2);
        expect(fiscalYear.getFiscalMonth('2017-07-01')).to.equal(3);
        expect(fiscalYear.getFiscalMonth('2017-08-01')).to.equal(4);
        expect(fiscalYear.getFiscalMonth('2017-09-01')).to.equal(5);
        expect(fiscalYear.getFiscalMonth('2017-10-01')).to.equal(6);
        expect(fiscalYear.getFiscalMonth('2017-11-01')).to.equal(7);
        expect(fiscalYear.getFiscalMonth('2017-12-01')).to.equal(8);
        expect(fiscalYear.getFiscalMonth('2017-01-01')).to.equal(9);
        expect(fiscalYear.getFiscalMonth('2017-02-01')).to.equal(10);
        expect(fiscalYear.getFiscalMonth('2017-03-01')).to.equal(11);
      });
    });
  });
});
