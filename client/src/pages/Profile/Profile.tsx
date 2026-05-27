import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ClockIcon } from 'lucide-react';

import { useAuth } from '@/context/AuthProvider';

import { EmptyState, RequestRow } from './UserRequests';

import { useRequests } from '@/context/RequestsProvider';

const Profile = () => {
	const { user, isAuthenticated } = useAuth();
	const {
		userCreatedRequests,
		userActiveRequests,
		userAcceptedRequests,
		userCompletedRequests,
		deleteRequest,
		completeRequest
	} = useRequests();

	const [activeTab, setActiveTab] = useState<'created' | 'active' | 'completed'>('created');
	const [showCompleted, setShowCompleted] = useState(false);

	const navigate = useNavigate();

	if (!isAuthenticated) {
		return (
			<main className='flex-1 flex items-center justify-center py-16 px-4'>
				<div className='text-center'>
					<div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
						<ClockIcon className='w-8 h-8 text-slate-400' />
					</div>
					<h2 className='text-lg font-medium text-slate-900 mb-2'>You are not signed in</h2>
					<p className='text-slate-500 text-sm mb-6'>Please create an account or sign in to view your profile.</p>
					<div className='flex gap-3 justify-center'>
						<button
							onClick={() => navigate('/register')}
							className='px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors cursor-pointer'
						>
							Create account
						</button>
						<button
							onClick={() => navigate('/login')}
							className='px-5 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:border-slate-300 transition-colors cursor-pointer'
						>
							Sign in
						</button>
					</div>
				</div>
			</main>
		);
	}

	const openRequests = userCreatedRequests.filter(r => r.status === 'open');
	const inProgressRequests = userCreatedRequests.filter(r => r.status === 'in-progress');
	const completedRequests = userCreatedRequests.filter(r => r.status === 'completed');

	const initials = user!.name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

	return (
		<main className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
			{/* Profile header */}
			<div className='bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6'>
				<div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
					{/* Avatar */}
					<div className='shrink-0'>
						<div className='w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-md'>
							{user!.profileImageUrl ? (
								<img src={user!.profileImageUrl} alt={user!.name} className='w-full h-full object-cover' />
							) : (
								<span className='text-2xl font-semibold text-teal-700'>{initials}</span>
							)}
						</div>
					</div>

					{/* Name + email */}
					<div className='flex-1 text-center sm:text-left'>
						<h1 className='text-xl font-semibold text-slate-900'>{user!.name}</h1>
						<p className='text-sm text-slate-500 mt-0.5'>{user!.email}</p>
						<p className='text-xs text-slate-500 mt-1.5'>My requests status:</p>
						{/* Stats row */}
						<div className='flex justify-center sm:justify-start gap-6 mt-4'>
							<div className='flex-1 text-center sm:text-left'>
								<p className='text-lg font-semibold text-slate-900'>{openRequests.length}</p>
								<p className='text-xs text-slate-500'>Open</p>
							</div>
							<div className='w-px bg-slate-200' />
							<div className='flex-1 text-center sm:text-left'>
								<p className='text-lg font-semibold text-slate-900'>{inProgressRequests.length}</p>
								<p className='text-xs text-slate-500'>In-Progress</p>
							</div>
							<div className='w-px bg-slate-200' />
							<div className='flex-1 text-center sm:text-left'>
								<p className='text-lg font-semibold text-slate-900'>{completedRequests.length}</p>
								<p className='text-xs text-slate-500'>Completed</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className='flex gap-1 bg-slate-100 p-1 rounded-xl mb-5'>
				<button
					onClick={() => setActiveTab('created')}
					className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
						activeTab === 'created'
							? 'bg-white text-slate-900 shadow-sm'
							: 'text-slate-500 hover:text-slate-700'
					}`}
				>
					My Requests
					<span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
						activeTab === 'created' ? 'bg-teal-50 text-teal-700' : 'bg-slate-200 text-slate-500'
					}`}>
						{userActiveRequests.length}
					</span>
				</button>
				<button
					onClick={() => setActiveTab('active')}
					className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
						activeTab === 'active'
							? 'bg-white text-slate-900 shadow-sm'
							: 'text-slate-500 hover:text-slate-700'
					}`}
				>
						Currently Doing
					<span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
						activeTab === 'active' ? 'bg-teal-50 text-teal-700' : 'bg-slate-200 text-slate-500'
					}`}>
						{userAcceptedRequests.length}
					</span>
				</button>
				<button
					onClick={() => setActiveTab('completed')}
					className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
						activeTab === 'completed'
							? 'bg-white text-slate-900 shadow-sm'
							: 'text-slate-500 hover:text-slate-700'
					}`}
				>
					Completed
					<span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
						activeTab === 'completed' ? 'bg-teal-50 text-teal-700' : 'bg-slate-200 text-slate-500'
					}`}>
						{userCompletedRequests.length}
					</span>
				</button>
			</div>
			{/* Tab content */}
			{activeTab === 'created' && (
				<div className='flex flex-col'>
					<div className='space-y-3'>
						{userActiveRequests.length === 0 ? (
							<EmptyState
								message="You haven't posted any requests yet."
								actionLabel='Post your first request'
								actionTo='/dashboard'
							/>
						) : (
							userActiveRequests.map((r) => <RequestRow key={r.id} request={r} personal={true} onDelete={deleteRequest} onComplete={completeRequest} />)
						)}
					</div>
					<div className='flex  items-center justify-center mt-4 mb-4'>
						<button
							className='w-1/3 items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-slate-100 text-slate-500 hover:text-slate-700'
							onClick={() => setShowCompleted(!showCompleted)}
						>
							{showCompleted ? 'Hide completed requests' : 'Show completed requests'}
						</button>
					</div>
					{showCompleted && (
						<div className='space-y-3'>
							{completedRequests.length === 0 ? (
								<EmptyState
									message="You haven't posted any requests yet."
									actionLabel='Post your first request'
									actionTo='/dashboard'
								/>
							) : (
								completedRequests.map((r) => <RequestRow key={r.id} request={r} personal={false}/>)
							)}
						</div>
					)}

				</div>
			)}

			{activeTab === 'active' && (
				<div className='space-y-3'>
					{userAcceptedRequests.length === 0 ? (
						<EmptyState
							message="You haven't started doing any requests yet."
							actionLabel='Browse requests'
							actionTo='/dashboard'
						/>
					) : (
						userAcceptedRequests.map((r) => <RequestRow key={r.id} request={r} personal={false}/>)
					)}
				</div>
			)}

			{activeTab === 'completed' && (
				<div className='space-y-3'>
					{userCompletedRequests.length === 0 ? (
						<EmptyState
							message="You haven't helped with any requests yet."
							actionLabel='Browse requests'
							actionTo='/dashboard'
						/>
					) : (
						userCompletedRequests.map((r) => <RequestRow key={r.id} request={r} personal={false}/>)
					)}
				</div>
			)}
		</main>
	);
};

export default Profile;