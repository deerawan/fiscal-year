export interface FiscalYear {
    month: number;
    day: number;
}
declare const FiscalYear: (fiscalYear: FiscalYear) => {
    getTaxMonths: (taxYear: number) => string[];
};
export default FiscalYear;
