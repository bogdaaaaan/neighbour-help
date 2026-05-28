import { useState, useRef, } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserCircleIcon, UploadIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '@/context/AuthProvider';
import FormInput from '@/components/Inputs/FormInput';

import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import uploadImage from '@/utils/uploadImage';
import { validators } from '@/utils/validators';


interface FieldErrors {
	avatar?: string;
	fullName?: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
}

const Register = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const [errors, setErrors] = useState<FieldErrors>({});
	const [submitted, setSubmitted] = useState(false);

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		const error = validators.avatar(file);
		if (error) {return;}
		setErrors((prev) => ({ ...prev, avatar: error }));

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			setAvatarPreview(result);
			setAvatarFile(file!);
		};
		reader.readAsDataURL(file!);
	};

	const validateRegistration = (): boolean => {
		const e: FieldErrors = {};
		e.email = validators.email(email);
		e.password = validators.password(password);
		e.fullName = validators.full_name(fullName);
		e.repeatPassword = validators.repeat_password(password, repeatPassword);

		setErrors(e);

		if (!e.email && !e.password && !e.fullName && !e.repeatPassword && !e.avatar) {return true;}

		return false;
	};

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateRegistration()) {return;}
		setSubmitted(true);

		// api call
		try {
			// Upload image if provided
			let profileImageUrl = undefined;
			if (avatarFile) {
				try {
					const uploadResponse = await uploadImage(avatarFile);
					profileImageUrl = uploadResponse.imageUrl;
				} catch (error) {
					console.error(error);
					toast.error('Image upload failed, continuing without image');
				}
			}

			const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
				name: fullName.trim(),
				email: email.trim(),
				password: password,
				profileImageUrl: profileImageUrl,
			});

			localStorage.setItem('token', response.data.token);
			localStorage.setItem('userId', response.data.id);
			localStorage.setItem('userName', response.data.name);

			login(response.data.id, response.data.email, response.data.name, response.data.profileImageUrl);
			toast.success('Registration successful!');
			navigate('/dashboard');
		} catch (error) {
			setSubmitted(false);
			toast.error('Unexpected error');
			console.error(error);
		} finally {
			setSubmitted(false);
		}
	};


	const passwordStrength = validators.passwordStrength(password);
	const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength];
	const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-teal-400', 'bg-teal-600'][passwordStrength];

	return (
		<main className='flex-1 flex items-center justify-center py-12 px-4'>
			<div className='w-full max-w-md'>
				{/* Header */}
				<div className='text-center mb-8'>
					<Link to='/' className='inline-block text-xl font-medium text-slate-900 hover:text-teal-600 transition-colors mb-6'>
						NeighbourHelp
					</Link>
					<h1 className='text-2xl font-semibold text-slate-900 mb-2'>Create your account</h1>
					<p className='text-slate-500 text-sm'>Join your neighbourhood community today</p>
				</div>

				{/* Card */}
				<div className='bg-white border border-slate-200 rounded-xl shadow-sm p-8'>
					<form onSubmit={handleSubmit} noValidate className='space-y-5'>

						{/* Avatar upload */}
						<div className='flex flex-col items-center gap-3 pb-2'>
							<button
								type='button'
								onClick={() => fileInputRef.current?.click()}
								className='relative group w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 hover:border-teal-500 transition-colors flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
							>
								{avatarPreview ? (
									<>
										<img src={avatarPreview} alt='Profile preview' className='w-full h-full object-cover' />
										<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
											<UploadIcon className='w-5 h-5 text-white' />
										</div>
									</>
								) : (
									<div className='flex flex-col items-center gap-1 text-slate-400 group-hover:text-teal-500 transition-colors'>
										<UserCircleIcon className='w-8 h-8' />
										<UploadIcon className='w-3.5 h-3.5' />
									</div>
								)}
							</button>
							<span className='text-xs text-slate-400'>
								{avatarPreview ? 'Click to change photo' : 'Add profile photo (optional)'}
							</span>
							{errors.avatar && <p className='text-xs text-red-500'>{errors.avatar}</p>}
							<input
								ref={fileInputRef}
								type='file'
								accept='image/*'
								className='hidden'
								onChange={handleAvatarChange}
							/>
						</div>

						{/* Form-level error */}
						{Object.values(errors).map((value, indx) => {
							if (value) {
								return (
									<div key={indx} className='bg-red-50 border border-red-200 rounded-lg px-4 py-3'>
										<p className='text-sm text-red-600'>{value}</p>
									</div>
								);
							}
						})}

						{/* Full name */}
						<FormInput
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							label={'Full Name'}
							placeholder='Jane Smith'
							type='text'
						/>

						{/* Email */}
						<FormInput
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							label={'Email address'}
							placeholder='jane@example.com'
							type='text'
						/>

						{/* Password */}
						<FormInput
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							label={'Password'}
							placeholder='Min. 8 characters'
							type='password'
						/>

						{/* Strength bar */}
						{password && (
							<div className='space-y-1 pt-0.5'>
								<div className='flex gap-1'>
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className={`h-1 flex-1 rounded-full transition-colors ${
												i <= passwordStrength ? strengthColor : 'bg-slate-200'
											}`}
										/>
									))}
								</div>
								<p className='text-xs text-slate-400'>{strengthLabel}</p>
							</div>
						)}
						{errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password}</p>}

						{/* Repeat password */}
						<FormInput
							value={repeatPassword}
							onChange={(e) => setRepeatPassword(e.target.value)}
							label={'Confirm password'}
							placeholder='Repeat your password'
							type='password'
						/>


						{errors.repeatPassword && <p className='text-xs text-red-500 mt-1'>{errors.repeatPassword}</p>}

						{/* Submit */}
						<button
							type='submit'
							disabled={submitted}
							className='w-full py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mt-2'
						>
							{submitted ? 'Creating account…' : 'Create account'}
						</button>
					</form>

					{/* Divider + login link */}
					<p className='text-center text-sm text-slate-500 mt-6'>
						Already have an account?{' '}
						<Link to='/login' className='text-teal-600 hover:text-teal-700 font-medium transition-colors'>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
};

export default Register;
