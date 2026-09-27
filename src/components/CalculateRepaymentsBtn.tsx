
import calculatorIcon from '../assets/images/icon-calculator.svg';
import { cn } from '../lib/utils';

type CalculateRepaymentsBtnProps = {
    className?: string;
};

function CalculateRepaymentsBtn({ className }: CalculateRepaymentsBtnProps) {
    return (
        <button
            className={cn(`bg-lime
                text-slate-900 text-lg font-bold
                rounded-2xl px-4 py-2
                flex flex-row gap-3 items-center justify-center
                cursor-pointer
                hover:bg-lime/80
                focus:outline-none focus:ring-2 focus:ring-lime/50
            `, className)}
            type="submit"
        >
            <img src={calculatorIcon} alt="Calculator" />
            Calculate Repayments
        </button>
    );
}

export default CalculateRepaymentsBtn;