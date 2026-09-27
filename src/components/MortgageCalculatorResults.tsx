
import { cn } from '../lib/utils';
import type { MortgageResults } from '../types';
type MortgageCalculatorResultsProps = {
    results: MortgageResults;
    className?: string;
};

function MortgageCalculatorResults({ results, className }: MortgageCalculatorResultsProps) {
    return (
        <div aria-live="polite"
            className={cn("bg-slate-900 text-white px-6 py-8 md:p-10 flex flex-col gap-6 md:gap-10", className)}>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Your results</h1>
                <p className="text-base text-slate-300 leading-6">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            </div>
            <div className="flex flex-col gap-4 bg-black/25 px-4 py-6 rounded-lg
                border-t-4 border-t-lime
            ">
                <div className="flex flex-col gap-2">
                    <h2 className="text-base font-medium text-slate-300 leading-6">Your monthly repayments</h2>
                    <output form="mortgage-calculator" className="text-[2.5rem] font-bold text-lime">£{results.monthlyRepayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</output>
                </div>
                <hr className="border-slate-700/50 h-px" />
                <div className="flex flex-col gap-2">
                    <h2 className="text-base font-medium text-slate-300 leading-6">Total you'll repay over the term</h2>
                    <output form="mortgage-calculator" className="text-2xl text-white font-bold">£{results.totalRepayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</output>
                </div>
            </div>
        </div>
    );
}

export default MortgageCalculatorResults;