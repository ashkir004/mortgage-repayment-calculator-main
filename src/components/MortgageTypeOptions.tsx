import { cn } from "../lib/utils";

type RadioOption = {
	label: string;
	value: string;
	checked: boolean;
};

type MortgageTypeProps = {
	className?: string;
	label: string;
	name: string;
	options: RadioOption[];
	error?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function MortgageType({ className, label, name, options, error, onChange }: MortgageTypeProps) {

	return (
		<fieldset className={cn("flex flex-col gap-4", className)}>
			<legend className="text-base text-slate-700 mb-3">{label}</legend>
			{options.map((option) => {
				const id = `${name}-${option.value}`;

				return (
					<label
						className="px-4 py-2 border-2 border-slate-500 flex flex-row items-center gap-4 rounded-sm cursor-pointer
						has-checked:border-lime has-checked:bg-lime-50
						"
						htmlFor={id}
						key={option.value}
					>
						<span className="relative flex size-6 shrink-0 items-center justify-center">
							<input
								className="peer appearance-none size-6 rounded-full border-2 border-slate-700 
									checked:border-lime 
										focus:outline-none focus:ring-2 focus:checked:ring-0 focus:ring-lime/50
									"
								type="radio"
								id={id}
								name={name}
								value={option.value}
								checked={option.checked}
								onChange={onChange}
							/>
							<span className="pointer-events-none absolute size-3 scale-0 rounded-full bg-lime transition-transform peer-checked:scale-100" />
						</span>
						<span className="text-lg font-bold text-slate-900">{option.label}</span>
					</label>
				);
			})}
			<span className="text-sm text-red font-medium leading-6">
				{error}
			</span>
		</fieldset>
	);
}

export default MortgageType;