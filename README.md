# Mortgage Repayment Calculator

A responsive mortgage repayment calculator built as a Frontend Mentor challenge using React.

The project focuses not only on reproducing the provided design, but also on modeling the application's behavior using a **finite state machine (FSM)** before implementation.

## Overview

The calculator allows users to enter:

* Mortgage amount
* Mortgage term
* Interest rate
* Mortgage type:

  * Repayment
  * Interest only

After submitting the form, the application validates the inputs and displays the calculated monthly repayment and total repayment.

Users can also clear the form and return to the initial state.

## Features

* Responsive design
* Mortgage repayment calculation
* Interest-only mortgage calculation
* Form validation
* Field-level validation errors
* Formatted mortgage amounts
* Decimal interest rates
* Clear/reset functionality
* Different UI states based on form status
* Accessible form controls

## Project Structure

```text
src/
├── App.tsx
├── main.tsx
├── types.ts
├── assets/
├── components/
│   ├── CalculateRepaymentsBtn.tsx
│   ├── InputGroup.tsx
│   ├── MortgageCalculator.tsx
│   ├── MortgageCalculatorPreResults.tsx
│   ├── MortgageCalculatorResults.tsx
│   └── MortgageTypeOptions.tsx
└── lib/
    ├── calculateMortgage.ts
    ├── utils.ts
    └── validateForm.ts
```

## State Model

The application state consists of:

```text
mortgageAmount
mortgageTerm
interestRate
mortgageType
formStatus
formErrors
```

`formStatus` represents the current state of the form:

```text
initial | editing | error | success
```

### Derived State

The mortgage result is **not stored as React state**.

Instead, it is derived from the form inputs:

```js
mortgageResult = calculateMortgage(
  mortgageAmount,
  mortgageTerm,
  interestRate,
  mortgageType
);
```

This avoids maintaining two sources of truth.

## Finite State Machine

The calculator is modeled as a finite state machine.

### States

```text
S = {
  initial,
  editing,
  error,
  success
}
```

### Events

```text
E = {
  changeInput,
  calculateMortgage,
  clearInputs
}
```

### Initial State

```text
S₀ = initial
```

### Transitions

```text
δ(initial, changeInput) = editing

δ(editing, calculateMortgage) =
    success  if validation succeeds
    error    if validation fails

δ(error, clearInputs) = initial

δ(success, clearInputs) = initial
```

### State Flow

```text
                    changeInput
        ┌─────────────────────────────┐
        │                             ▼
   ┌─────────┐                  ┌─────────┐
   │ initial │─────────────────▶│ editing │
   └─────────┘                  └────┬────┘
        ▲                            │
        │                      calculateMortgage
        │                       ┌────┴────┐
        │                       │         │
        │                    valid      invalid
        │                       │         │
        │                       ▼         ▼
        │                   ┌────────┐ ┌───────┐
        │                   │ success│ │ error │
        │                   └───┬────┘ └───┬───┘
        │                       │          │
        └──────── clearInputs ──┴──────────┘
```

## UI States

The FSM state determines what the user sees:

| Form State | UI                                |
| ---------- | --------------------------------- |
| `initial`  | Pre-results / empty state         |
| `editing`  | Mortgage form                     |
| `error`    | Mortgage form + validation errors |
| `success`  | Mortgage calculation results      |

The application therefore follows the React principle:

```text
State → Render UI
```

rather than maintaining separate boolean states such as:

```text
showForm
showErrors
showResults
```

## Validation

Validation occurs when the user submits the form.

```text
CalculateMortgage
       ↓
validateInputs()
       ↓
   ┌───┴────┐
 valid     invalid
   │          │
   ▼          ▼
success      error
```

Validation errors are stored in `formErrors` and associated with their respective fields.

## Mortgage Calculation

### Repayment Mortgage

For a repayment mortgage, the monthly payment is calculated using:

```text
M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]
```

Where:

```text
P = principal
r = monthly interest rate
n = total number of monthly payments
```

The annual interest rate entered by the user is converted to a monthly decimal rate:

```js
const monthlyRate = annualRate / 100 / 12;
```

The total number of payments is:

```js
const numberOfPayments = mortgageTerm * 12;
```

### Interest-Only Mortgage

For an interest-only mortgage, the monthly payment consists only of the interest:

```text
Monthly Interest = Principal × Annual Rate / 12
```

The principal is not included in the monthly repayment calculation.


## Tech Stack

* React
* JavaScript
* Vite
* Tailwind CSS
* ESLint / Oxlint
* Git / GitHub

## Project Structure

```text
src/
├── components/
│   ├── MortgageForm.jsx
│   ├── MortgageResults.jsx
│   └── PreResults.jsx
│
├── utils/
│   ├── calculateMortgage.js
│   └── validateMortgage.js
│
├── App.jsx
└── main.jsx
```

## Accessibility

The calculator is designed with accessibility in mind, including:

* Semantic HTML
* Proper form controls
* Associated labels
* Keyboard accessibility
* Visible validation feedback
* Appropriate input modes for numeric and decimal values
* Error messaging that identifies the affected field

## What I Learned

This project is being used to practice more than visual implementation.

Key concepts explored:

* React controlled inputs
* State modeling
* Derived state
* Form validation
* Event-driven UI
* Finite state machines
* State transitions
* Guards
* Actions
* Separation of UI state from data state
* Responsive design
* Accessible forms

A major design principle used throughout the project is:

> **Model the application's state first, then let the UI derive from that state.**

## Frontend Mentor

This project is based on the [Mortgage Repayment Calculator challenge](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73).

Frontend Mentor provides the design and requirements; the implementation and architecture are my own.

## Links

- Live Site: [Mortgage Repayment Calculator](https://mortgage-calculator-main.netlify.app/)
- Repository: [Github: mortgage-repayment-calculator-main](https://github.com/ashkir004/mortgage-repayment-calculator-main)

## Author

**Ahmed A. Musa**

GitHub: [ashkir004](https://github.com/ashkir004)
