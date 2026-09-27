
import MortgageCalculator from './components/MortgageCalculator';

function App() {
  return (
    <main className="flex flex-col gap-0
        md:p-10 bg-slate-100 items-center justify-center min-h-screen
        lg:flex-row
    ">
      <MortgageCalculator />
    </main>
  );
}

export default App;