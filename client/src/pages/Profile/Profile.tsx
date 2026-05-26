import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ClockIcon } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

import type { HelpRequest } from '@/types/common';

import { EmptyState, RequestRow } from './utils';

import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import { mapRequest } from '@/utils/mapper';

const Profile = () => {
	const { user, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [myRequests, setMyRequests] = useState<HelpRequest[]>([]);

	useEffect(() => {
		const getUserRequests = async () => {
			try {
				const response = await axiosInstance.get(API_PATHS.REQUESTS.GET_USER_REQUESTS(user!.id));

				if (!response.data) {
					throw Error('Error fetching request');
				}

				const mappedRequests = response.data.map(mapRequest);

				setMyRequests(mappedRequests);
			} catch (error) {
				console.error(error);
			}
		};

		getUserRequests();
	}, [user]);

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
							onClick={() => navigate('/auth')}
							className='px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors'
						>
							Create account
						</button>
						<button
							onClick={() => navigate('/login')}
							className='px-5 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:border-slate-300 transition-colors'
						>
							Sign in
						</button>
					</div>
				</div>
			</main>
		);
	}

	const initials = user!.fullName
		.split(' ')
		.map((n) => n[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

	const openCount = myRequests.filter((r) => r.status === 'open').length;

	return (
		<main className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
			{/* Profile header */}
			<div className='bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6'>
				<div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
					{/* Avatar */}
					<div className='shrink-0'>
						<div className='w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-md'>
							{user!.avatar ? (
								<img src={user!.avatar} alt={user!.fullName} className='w-full h-full object-cover' />
							) : (
								<span className='text-2xl font-semibold text-teal-700'>{initials}</span>
							)}
						</div>
					</div>

					{/* Name + email */}
					<div className='flex-1 text-center sm:text-left'>
						<h1 className='text-xl font-semibold text-slate-900'>{user!.fullName}</h1>
						<p className='text-sm text-slate-500 mt-0.5'>{user!.email}</p>

						{/* Stats row */}
						<div className='flex justify-center sm:justify-start gap-6 mt-4'>
							<div className='text-center sm:text-left'>
								<p className='text-lg font-semibold text-slate-900'>{myRequests.length}</p>
								<p className='text-xs text-slate-500'>Requests created</p>
							</div>
							<div className='w-px bg-slate-200' />
							<div className='text-center sm:text-left'>
								<p className='text-lg font-semibold text-slate-900'>{openCount}</p>
								<p className='text-xs text-slate-500'>Currently open</p>
							</div>
							<div className='w-px bg-slate-200' />
						</div>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className='flex gap-1 bg-slate-100 p-1 rounded-xl mb-5'>
				<button
					className={'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors bg-white text-slate-900 shadow-sm'}
				>
					My Requests
					<span className={'text-xs px-1.5 py-0.5 rounded-full font-medium \'bg-teal-50 text-teal-700\''}>
						{myRequests.length}
					</span>
				</button>

			</div>

			<div className='space-y-3'>
				{myRequests.length === 0 ? (
					<EmptyState
						message="You haven't posted any requests yet."
						actionLabel='Post your first request'
						actionTo='/dashboard'
					/>
				) : (
					myRequests.map((r) => <RequestRow key={r.id} request={r} />)
				)}
			</div>
		</main>
	);
};

export default Profile;