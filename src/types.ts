
export type FormData = {
    mortgageAmount: string;
    mortgageTerm: string;
    interestRate: string;
    mortgageType: string;
    formStatus?: 'initial' | 'editing' | 'success' | 'error';
    formErrors?: {
        [key: string]: string;
    };
};

export type MortgageResults = {
    monthlyRepayment: number;
    totalRepayment: number;
};