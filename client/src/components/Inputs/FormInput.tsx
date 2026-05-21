import type { FieldErrors } from '@/types/auth';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

interface InputProps {
	value: string;
	onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	placeholder?: string;
	type: string;
	errors: FieldErrors
}

const Input = ({ value, onChange, label, placeholder, type, errors }: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className='space-y-1.5'>
			<label htmlFor={label} className='text-sm font-medium text-slate-700'>{label}</label>
			<div className='relative'>
				<input
					id={label}
					type={type == 'password' ? showPassword ? 'text' : 'password' : type}
					placeholder={placeholder}
					className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 ${
						errors.fullName ? 'border-red-400' : 'border-slate-200 hover:border-slate-300'
					}`}
					value={value}
					onChange={onChange}
				/>
				{type == 'password' && (
					<button
						type='button'
						onClick={() => togglePasswordVisibility()}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none'
						tabIndex={-1}
					>
						{type == 'password' && (
							<>
								{showPassword ? <EyeOffIcon className='w-4 h-4' /> : <EyeIcon className='w-4 h-4' />}
							</>
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default Input;