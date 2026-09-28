
import mortgageIllustration from '../assets/images/illustration-empty.svg';
import { cn } from "../lib/utils";

type MortgageCalculatorPreResultsProps = {
    className?: string;
};

function MortgageCalculatorPreResults({ className }: MortgageCalculatorPreResultsProps) {
    return (
        <div className={cn(`bg-slate-900 text-white px-6 py-8 md:p-10 flex flex-col items-center justify-center gap-6`, className)}>
            <img src={mortgageIllustration} alt="Mortgage illustration" />
            <h1 className="text-2xl font-bold">Results shown here</h1>
            <p className="text-base text-slate-300 leading-6 text-center">
                Complete the form and click “calculate repayments” to see what your monthly repayments would be.
            </p>
        </div>
    );
}

export default MortgageCalculatorPreResults;