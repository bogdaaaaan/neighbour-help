import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import FormInput from '@/components/Inputs/FormInput';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface FieldErrors {
	email?: string;
	password?: string;
	form?: string;
}

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<FieldErrors>({});
	const [submitting, setSubmitting] = useState(false);

	const validate = (): FieldErrors => {
		const e: FieldErrors = {};
		if (!EMAIL_RE.test(email.trim())) {e.email = 'Enter a valid email address.';}
		if (password.length < 1) {e.password = 'Password is required.';}
		return e;
	};

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const fieldErrors = validate();
		setErrors(fieldErrors);
		if (Object.keys(fieldErrors).length > 0) {return;}

		setSubmitting(true);
		setTimeout(() => {
			const stored = localStorage.getItem('nh_user');
			if (stored) {
				const user = JSON.parse(stored);
				if (user.email === email.trim()) {
					login(user.email, user.fullName, user.avatar);
					navigate('/');
					return;
				}
			}
			setErrors({ form: 'No account found with that email. Please register first.' });
			setSubmitting(false);
		}, 600);
	};

	return (
		<main className='flex-1 flex items-center justify-center py-12 px-4'>
			<div className='w-full max-w-sm'>
				{/* Header */}
				<div className='text-center mb-8'>
					<Link to='/' className='inline-block text-xl font-medium text-slate-900 hover:text-teal-600 transition-colors mb-6'>
						NeighbourHelp
					</Link>
					<h1 className='text-2xl font-semibold text-slate-900 mb-2'>Welcome back</h1>
					<p className='text-slate-500 text-sm'>Sign in to your account</p>
				</div>

				{/* Card */}
				<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-8'>
					<form onSubmit={handleSubmit} noValidate className='space-y-5'>

						{/* Form-level error */}
						{errors.form && (
							<div className='bg-red-50 border border-red-200 rounded-lg px-4 py-3'>
								<p className='text-sm text-red-600'>{errors.form}</p>
							</div>
						)}

						{/* Email */}
						<FormInput
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							label={'Email address'}
							placeholder='jane@example.com'
							type='text'
							errors={errors}
						/>

						{/* Password */}
						<FormInput
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							label={'Password'}
							placeholder='Your password'
							type='password'
							errors={errors}
						/>

						{/* Submit */}
						<button
							type='submit'
							disabled={submitting}
							className='w-full py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mt-2'
						>
							{submitting ? 'Signing in…' : 'Sign in'}
						</button>
					</form>

					{/* Register link */}
					<p className='text-center text-sm text-slate-500 mt-6'>
						{'Don\'t have an account? '}
						<Link to='/register' className='text-teal-600 hover:text-teal-700 font-medium transition-colors'>
							Create one
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
};

export default Login;