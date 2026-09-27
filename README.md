# Mortgage Calculator

## State

- mortgageAmount
- mortgageTerm
- interestRate
- mortgageType
- formStatus = 'initial' | 'editing' | 'error' | 'success'
- formErrors


## UI States

- initial  → ShowPreResults
- editing  → ShowForm
- error    → ShowForm + ShowErrors
- success  → ShowResults


## Derived

mortgageResult = calculateMortgage(
    mortgageAmount,
    mortgageTerm,
    interestRate,
    mortgageType
)


## Events

- changeMortgageAmount
- changeMortgageTerm
- changeInterestRate
- changeMortgageType
- calculateMortgage
- clearInputs


## Mortgage Calculator FSM

```
S = { initial, editing, error, success }

E = {
  changeInput,
  calculateMortgage,
  clearInputs
}

A = {
  updateInput,
  validateInputs,
  calculateMortgageResult,
  setFormErrors,
  clearInputs
}

S₀ = initial

δ(initial, changeInput) = editing
  Action: updateInput


δ(editing, calculateMortgage) =
    success  if validation succeeds
    error    if validation fails

  Actions:
      validateInputs()
      calculateMortgageResult()   if success
      setFormErrors()             if invalid


δ(error, clearInputs) = initial
  Action: clearInputs

δ(success, clearInputs) = initial
  Action: clearInputs

```