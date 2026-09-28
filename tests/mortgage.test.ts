
import { describe, it, expect } from "vitest";
import calculateMortgage from '../src/lib/calculateMortgage';

describe('calculate monthly repayment', () => {
    it('should calculate monthly repayment for repayment mortgage', () => {
        const result = calculateMortgage(300000, 25, 5.25, 'repayment');
        expect(result.monthlyRepayment).toBeCloseTo(1797.74, 2);
    });

    it('should calculate total repayment for repayment mortgage', () => {
        const result = calculateMortgage(300000, 25, 5.25, 'repayment');
        expect(result.totalRepayment).toBeCloseTo(539322.94, 2);
    });

    it('should handle zero interest rate for repayment mortgage', () => {
        const result = calculateMortgage(300000, 25, 0, 'repayment');
        expect(result.monthlyRepayment).toBeCloseTo(1000, 2);
        expect(result.totalRepayment).toBeCloseTo(300000, 2);
    });

    it('should calculate monthly repayment for interest-only mortgage', () => {
        const result = calculateMortgage(300000, 25, 5.25, 'interestOnly');
        expect(result.monthlyRepayment).toBeCloseTo(1312.50, 2);
    });

    it('should calculate total repayment for interest-only mortgage', () => {
        const result = calculateMortgage(300000, 25, 5.25, 'interestOnly');
        expect(result.totalRepayment).toBeCloseTo(393750, 2);
    });

    it('should handle zero interest rate for interest-only mortgage', () => {
        const result = calculateMortgage(300000, 25, 0, 'interestOnly');
        expect(result.monthlyRepayment).toBeCloseTo(0, 2);
        expect(result.totalRepayment).toBeCloseTo(0, 2);
    });
});


