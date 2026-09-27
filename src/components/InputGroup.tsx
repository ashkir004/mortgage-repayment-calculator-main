import { cn } from "../lib/utils";

type InputGroupProps = {
	id: string;
    name: string;
    type: string;
	inputMode: string;
	label: string;
	prefix?: string;
	suffix?: string;
	inputClassName?: string;
	className?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	dirty?: boolean;
	error?: string;
};

function InputGroup({ id, label, type, name, inputMode, value, onChange, prefix, suffix, dirty, error, inputClassName, className, ...inputProps }: InputGroupProps) {
	return (
		<div className={cn("grid grid-cols-1 grid-rows-[auto_1fr] gap-2", className)}>
			<label className="text-slate-700" htmlFor={id}>
				{label}
			</label>
			<input
				{...inputProps}
				className={cn(`p-2 ${prefix && 'pl-10'} border-2 border-slate-500 rounded-sm col-span-full row-start-2 
					focus:outline-none
					focus:ring-1 focus:ring-lime/50
					`, inputClassName, error && 'border-red', dirty && !error && 'border-lime')}
				id={id}
				type={type}
				inputMode={inputMode === 'numeric' ? 'numeric' : 'text'}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{prefix && (
				<span className={cn(
					`bg-slate-100 text-slate-700 
				max-w-max px-3 py-2 border-y-2 border-l-2 border-slate-500 
				rounded-l-sm row-start-2 col-span-full`, 
					error && 'bg-red text-white border-red',
					dirty && !error && 'bg-lime text-slate-900 border-lime'
				)}>
					{prefix}
				</span>
			)}
			{suffix && (
				<span className={cn(`bg-slate-100 text-slate-700 
					max-w-max px-3 py-2 border-y-2 border-r-2 border-slate-500 
					rounded-r-sm row-start-2 col-span-full ml-auto`,
						error && 'bg-red text-white border-red',
						dirty && !error && 'bg-lime text-slate-900 border-lime'
						)}>
					{suffix}
				</span>
			)}
			{error && (
				<span className="text-red text-sm font-medium leading-6">
					{error}
				</span>
			)}
		</div>
	);
}

export default InputGroup;
