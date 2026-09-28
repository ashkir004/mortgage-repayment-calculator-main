
import { useState, type ChangeEvent } from "react";
import InputGroup from "./InputGroup";
import MortgageTypeOptions from "./MortgageTypeOptions";
import CalculateRepaymentBtn from "./CalculateRepaymentsBtn";
import type { FormData } from "../types";
import MortageCalculatorResults from "./MortgageCalculatorResults";
import MortgageCalculatorPreResults from "./MortgageCalculatorPreResults";
import calculateMortgage from '../lib/calculateMortgage';
import validateForm from '../lib/validateForm';
import { formatNumber, sanitizeNumberInput } from '../lib/utils';


function MortgageCalculator() {

    const [ form, setForm ] = useState<FormData>({
        mortgageAmount: '',
        mortgageTerm: '',
        interestRate: '',
        mortgageType: '',
        formStatus: 'initial',
        formErrors: {},
    });

    const [ results, setResults ] = useState({
        monthlyRepayment: 0,
        totalRepayment: 0,
    });

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (form.formStatus === 'initial' && !form.mortgageAmount && !form.mortgageTerm && !form.interestRate && !form.mortgageType) {
            setForm((prevForm) => ({
                ...prevForm,
                formStatus: 'error',
                formErrors: {
                    mortgageAmount: 'This field is required',
                    mortgageTerm: 'This field is required',
                    interestRate: 'This field is required',
                    mortgageType: 'This field is required',
                },
            }));
            return;
        }

        if (form.formStatus === 'initial') return;

        const errors = validateForm({
            mortgageAmount: form.mortgageAmount,
            mortgageTerm: form.mortgageTerm,
            interestRate: form.interestRate,
            mortgageType: form.mortgageType,
        });
        if (Object.keys(errors).length > 0) {
            setForm((prevForm) => ({
                ...prevForm,
                formStatus: 'error',
                formErrors: errors,
            }));
            return;
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                formStatus: 'success',
                formErrors: {},
            }));

            setResults(calculateMortgage(
                parseFloat(form.mortgageAmount.replace(/,/g, '')),
                parseFloat(form.mortgageTerm),
                parseFloat(form.interestRate),
                form.mortgageType
            ));
        }
    }

    function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setForm((prevForm) => ({
          ...prevForm,
          [name]: formatNumber(value),
          formStatus: 'editing',
          formErrors: {
              ...prevForm.formErrors,
              [name]: '',
          },
      }));
    }

    function handleTermChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setForm((prevForm) => ({
          ...prevForm,
          [name]: formatNumber(value),
          formStatus: 'editing',
          formErrors: {
              ...prevForm.formErrors,
              [name]: '',
          },
      }));
    }

    function handleRateChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setForm((prevForm) => ({
          ...prevForm,
          [name]: sanitizeNumberInput(value),
          formStatus: 'editing',
          formErrors: {
              ...prevForm.formErrors,
              [name]: '',
          },
      }));
    }

    function handleMortgageTypeChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
          formStatus: 'editing',
          formErrors: {
              ...prevForm.formErrors,
              [name]: '',
          },
      }));
    }

    function handleClearForm() {
        setForm({
            mortgageAmount: '',
            mortgageTerm: '',
            interestRate: '',
            mortgageType: '',
            formStatus: 'initial',
            formErrors: {},
        });
    }

    return (
      <main className="flex flex-col gap-0
        lg:flex-row bg-white md:rounded-3xl lg:max-w-5xl lg:shadow-xl/10 lg:shadow-slate-900/50
      ">
        <form id="mortgage-calculator" 
            className="grid grid-cols-1 gap-6
                md:grid-cols-2 px-6 py-8 md:p-10 bg-white md:rounded-t-3xl 
                lg:flex-1 lg:rounded-r-none lg:rounded-l-3xl md:items-start
        " onSubmit={handleSubmit}>

            <div className="flex flex-col gap-1 items-start md:flex-row md:justify-between md:col-span-full">
                <h1 className='text-2xl text-slate-900' >Mortgage Calculator</h1>
                <button 
                    type="button"
                    onClick={handleClearForm}
                    className='text-base text-slate-700'>Clear All</button>
            </div>

            <InputGroup
                id="mortgageAmount"
                label="Mortgage Amount"
                name="mortgageAmount"
                value={form.mortgageAmount}
                prefix="£"
                type="text"
                inputMode="numeric"
                dirty={form.formStatus === 'editing' && form.mortgageAmount !== ''}
                error={form.formStatus === 'error' ? form.formErrors?.mortgageAmount: ''}
                className="md:col-span-full"
                onChange={handleAmountChange}
            />

            <InputGroup 
                id="mortgageTerm"
                label="Mortgage Term"
                name="mortgageTerm"
                type="text"
                inputMode="numeric"
                value={form.mortgageTerm}
                suffix="years"
                dirty={form.formStatus === 'editing' && form.mortgageTerm !== ''}
                error={form.formStatus === 'error' ? form.formErrors?.mortgageTerm : ''}
                onChange={handleTermChange}
            />

            <InputGroup
                id="interestRate"
                label="Interest Rate"
                name="interestRate"
                value={form.interestRate}
                suffix="%"
                type="text"
                inputMode="decimal"
                dirty={form.formStatus === 'editing' && form.interestRate !== ''}
                error={form.formStatus === 'error' ? form.formErrors?.interestRate : ''}
                onChange={handleRateChange}
            />

            <MortgageTypeOptions
                className="md:col-span-full"
                label="Mortgage Type"
                name="mortgageType"
                error={form.formStatus === 'error' ? form.formErrors?.mortgageType: ''}
                options={[
                    { label: "Repayment", value: "repayment", checked: form.mortgageType === "repayment" },
                    { label: "Interest Only", value: "interestOnly", checked: form.mortgageType === "interestOnly" },
                ]}
                onChange={handleMortgageTypeChange}
            />

            <CalculateRepaymentBtn className="md:col-span-full" />
        </form>
        {form.formStatus === 'success' ? (
            <MortageCalculatorResults results={results} 
            className="md:rounded-b-3xl lg:flex-1 lg:rounded-r-3xl lg:rounded-bl-[5rem]"  />
        ) : (
            <MortgageCalculatorPreResults 
            className="md:rounded-b-3xl lg:flex-1 lg:rounded-r-3xl lg:rounded-bl-[5rem]" />
        )}
      </main>
    );
}

export default MortgageCalculator;