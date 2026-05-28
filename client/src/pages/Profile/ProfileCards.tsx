import { useState } from 'react';

import { useRequests } from '@/context/RequestsProvider';

import { EmptyState, RequestRow } from './ProfileCardsUtils';

interface ProfileCardsProps {
	activeTab: string;
}

const ProfileCards = ({ activeTab } : ProfileCardsProps) => {
	const {
		userCreatedRequests,
		userActiveRequests,
		userAcceptedRequests,
		userCompletedRequests,
		deleteRequest,
		completeRequest
	} = useRequests();

	const [showCompleted, setShowCompleted] = useState(false);

	const completedRequests = userCreatedRequests.filter(r => r.status === 'completed');

	return (
		<>
			{activeTab == 'created' && (
				<div className='flex flex-col'>
					<div className='space-y-3'>
						{userActiveRequests.length === 0 ? (
							<EmptyState
								message="You haven't posted any requests yet."
								actionLabel='Post your first request'
								actionTo='/dashboard'
							/>
						) : (
							userActiveRequests.map((r) => <RequestRow key={r.id} request={r} activeTab={activeTab} onDelete={deleteRequest} onComplete={completeRequest} />)
						)}
					</div>
					{completedRequests.length > 0 && (
						<div className='flex  items-center justify-center mt-4 mb-4'>
							<button
								className='w-1/3 items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-slate-100 text-slate-500 hover:text-slate-700'
								onClick={() => setShowCompleted(!showCompleted)}
							>
								{showCompleted ? 'Hide completed requests' : 'Show completed requests'}
							</button>
						</div>
					)}
					{showCompleted && (
						<div className='space-y-3'>
							{completedRequests.length === 0 ? (
								<EmptyState
									message="You haven't posted any requests yet."
									actionLabel='Post your first request'
									actionTo='/dashboard'
								/>
							) : (
								completedRequests.map((r) => <RequestRow key={r.id} request={r} activeTab={activeTab}/>)
							)}
						</div>
					)}
				</div>
			)}

			{activeTab == 'active' && (
				<div className='space-y-3'>
					{userAcceptedRequests.length === 0 ? (
						<EmptyState
							message="You haven't started doing any requests yet."
							actionLabel='Browse requests'
							actionTo='/dashboard'
						/>
					) : (
						userAcceptedRequests.map((r) => <RequestRow key={r.id} request={r} activeTab={activeTab}/>)
					)}
				</div>
			)}

			{activeTab == 'completed' && (
				<div className='space-y-3'>
					{userCompletedRequests.length === 0 ? (
						<EmptyState
							message="You haven't helped with any requests yet."
							actionLabel='Browse requests'
							actionTo='/dashboard'
						/>
					) : (
						userCompletedRequests.map((r) => <RequestRow key={r.id} request={r} activeTab={activeTab}/>)
					)}
				</div>
			)}
		</>
	);
};

export default ProfileCards;