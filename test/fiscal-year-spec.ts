import FiscalYear from '../src/fiscal-year';
import * as chai from 'chai';

const expect = chai.expect;

describe('Fiscal Year', () => {
  const JAN_1 = { month: 0, day: 1 };
  const JUL_1 = { month: 6, day: 1 };
  const APR_6 = { month: 3, day: 6 };

  describe('#getTaxMonths', function() {
    context('when fiscal year is 1 JAN', () => {
      it('returns tax months from JAN - DEC', () => {
        const fiscalYear = FiscalYear(JAN_1);
        expect(fiscalYear.getTaxMonths(2017)).to.eql([
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

    context('when fiscal year is 1 JUL', () => {
      it('returns tax months from JUL 2016 - JUNE 2017', () => {
        const fiscalYear = FiscalYear(JUL_1);
        expect(fiscalYear.getTaxMonths(2017)).to.eql([
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

    context('when fiscal year is 6 APR', () => {
      it('returns tax months from APR 2016 - MARCH 2017', () => {
        const fiscalYear = FiscalYear(APR_6);
        expect(fiscalYear.getTaxMonths(2017)).to.eql([
         '2016-04-06',
         '2016-05-06',
         '2016-06-06',
         '2016-07-06',
         '2016-08-06',
         '2016-09-06',
         '2016-10-06',
         '2016-11-06',
         '2016-12-06',
         '2017-01-06',
         '2017-02-06',
         '2017-03-06',
        ]);
      });
    });
  });
});
