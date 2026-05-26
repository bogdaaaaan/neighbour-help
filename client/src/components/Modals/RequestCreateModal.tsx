import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { useRequests } from '@/context/RequestsProvider';
import { categories, formatDate } from '@/utils/common';
import toast from 'react-hot-toast';
import type { Author } from '@/types/common';

const DESCRIPTION_MAX = 400;

interface FieldErrors {
	title?: string;
	category?: string;
	description?: string;
}

const RequestCreateModal = () => {
	const { user } = useAuth();
	const { isCreateModalOpen, closeCreateModal, addRequest } = useRequests();

	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [errors, setErrors] = useState<FieldErrors>({});
	const [submitted, setSubmitted] = useState(false);

	// Lock body scroll
	useEffect(() => {
		if (isCreateModalOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	}, [isCreateModalOpen]);

	const validate = (): FieldErrors => {
		const e: FieldErrors = {};
		if (title.trim().length < 5) {e.title = 'Title must be at least 5 characters.';}
		if (!category) {e.category = 'Please select a category.';}
		if (description.trim().length < 20) {e.description = 'Description must be at least 20 characters.';}
		return e;
	};

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const fieldErrors = validate();
		setErrors(fieldErrors);
		if (Object.keys(fieldErrors).length > 0) {return;}

		if (!user?.id) {
			toast.error('User not authenticated');
			return;
		}

		setSubmitted(true);

		try {
			const _author: Author = {
				_id: user.id,
				name: user.fullName,
				email: user.email
			};

			addRequest({
				author: _author,
				title: title.trim(),
				category,
				description: description.trim(),
				status: 'open',
				date: formatDate(new Date())
			});

			setTitle('');
			setCategory('');
			setDescription('');
			setErrors({});

			setTimeout(() => closeCreateModal(), 700);
		} catch (error) {
			setSubmitted(false);
			console.error(error);
		}
	};

	if (!isCreateModalOpen) {return null;}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
			{/* Backdrop */}
			<div
				className='fixed inset-0 bg-slate-900/25 backdrop-blur-sm'
				onClick={closeCreateModal}
			/>

			{/* Modal */}
			<div className='relative bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]'>
				{/* Header */}
				<div className='flex items-center justify-between px-6 py-5 border-b border-slate-100'>
					<div>
						<h2 className='text-base font-semibold text-slate-900'>Post a Help Request</h2>
						<p className='text-xs text-slate-500 mt-0.5'>Your neighbours will see this on the board</p>
					</div>
					<button
						onClick={closeCreateModal}
						className='w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer'
					>
						<X className='w-4 h-4' />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} noValidate className='flex flex-col flex-1 overflow-y-auto'>
					<div className='px-6 py-5 space-y-5'>
						{/* Title */}
						<div className='space-y-1.5'>
							<label htmlFor='req-title' className='text-sm font-medium text-slate-700'>
								Title
							</label>
							<input
								id='req-title'
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder='e.g. Help carrying boxes up to 2nd floor'
								maxLength={80}
								className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 ${
									errors.title ? 'border-red-400' : 'border-slate-200 hover:border-slate-300'
								}`}
							/>
							<div className='flex justify-between items-center'>
								{errors.title
									? <p className='text-xs text-red-500'>{errors.title}</p>
									: <span />}
								<span className='text-xs text-slate-400 ml-auto'>{title.length}/80</span>
							</div>
						</div>

						{/* Category */}
						<div className='space-y-2'>
							<label className='text-sm font-medium text-slate-700'>Category</label>
							<div className='grid grid-cols-3 gap-2'>
								{categories.map(({ id, label, icon: Icon }) => {
									const active = category === id;
									return (
										<button
											key={id}
											type='button'
											onClick={() => setCategory(id)}
											className={`cursor-pointer flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 ${
												active
													? 'border-teal-600 bg-teal-50 text-teal-700'
													: 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
											}`}
										>
											<Icon className={`w-4 h-4 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
											{label}
										</button>
									);
								})}
							</div>
							{errors.category && <p className='text-xs text-red-500'>{errors.category}</p>}
						</div>

						{/* Description */}
						<div className='space-y-1.5'>
							<label htmlFor='req-description' className='text-sm font-medium text-slate-700'>
								Description
							</label>
							<textarea
								id='req-description'
								value={description}
								onChange={(e) => setDescription(e.target.value.slice(0, DESCRIPTION_MAX))}
								placeholder='Describe what you need help with, when, and any useful details…'
								rows={4}
								className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 ${
									errors.description ? 'border-red-400' : 'border-slate-200 hover:border-slate-300'
								}`}
							/>
							<div className='flex justify-between items-center'>
								{errors.description
									? <p className='text-xs text-red-500'>{errors.description}</p>
									: <span />}
								<span className={`text-xs ml-auto ${description.length >= DESCRIPTION_MAX ? 'text-amber-500' : 'text-slate-400'}`}>
									{description.length}/{DESCRIPTION_MAX}
								</span>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className='px-6 py-4 border-t border-slate-100 flex gap-3'>
						<button
							type='button'
							onClick={closeCreateModal}
							className='cursor-pointer px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={submitted}
							className='cursor-pointer flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
						>
							{submitted ? 'Posted!' : 'Post Request'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RequestCreateModal;