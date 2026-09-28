
// calculate monthly mortgage and total repayment amount
function calculateMortgage(mortgageAmount: number, mortgageTerm: number, interestRate: number, mortgageType: string): { monthlyRepayment: number, totalRepayment: number } {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;

    let monthlyRepayment, totalRepayment: number;

    if (interestRate === 0 && mortgageType === 'repayment') {
        monthlyRepayment = mortgageAmount / numberOfPayments;
        totalRepayment = mortgageAmount;
    } else if (interestRate === 0 && mortgageType === 'interestOnly') {
        monthlyRepayment = 0;
        totalRepayment = 0;
    } else if (mortgageType === 'interestOnly') {
        monthlyRepayment = mortgageAmount * monthlyInterestRate;
        totalRepayment = monthlyRepayment * numberOfPayments;
    } else {
        monthlyRepayment = (mortgageAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        totalRepayment = monthlyRepayment * numberOfPayments;
    }

    return { monthlyRepayment, totalRepayment };
}


export default calculateMortgage;