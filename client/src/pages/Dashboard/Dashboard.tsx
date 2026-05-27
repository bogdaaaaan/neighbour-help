import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { HelpRequest } from '@/types/common';

import CategoryFilter from '@/components/Layouts/CategoryFilter';
import HelpRequestCard from '@/components/Cards/HelpRequestCard';
import RequestInfoModal from '@/components/Modals/RequestInfoModal';

import { useRequests } from '@/context/RequestsProvider';
import { useAuth } from '@/context/AuthProvider';

import { CATEGORIES } from '@/utils/categories';


const Dashboard = () => {
	const { requests } = useRequests();
	const { user } = useAuth();
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);

	const requestsFromOthers = requests.filter(r => r.author.id !== user?.id && r.status == 'open');

	const filteredRequests = activeCategory
		? requestsFromOthers.filter(request => request.category === activeCategory)
		: requestsFromOthers;

	return (
		<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<CategoryFilter
				categories={CATEGORIES}
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
			/>

			<div className={`mt-8 grid grid-cols-1 ${filteredRequests.length > 0 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}>
				{filteredRequests.length > 0 ? filteredRequests.map(request => (
					<HelpRequestCard
						key={request.id}
						request={request}
						categoryLabel={CATEGORIES.find(c => c.id === request.category)?.label || 'Other'}
						onViewDetails={() => setSelectedRequest(request)}
					/>
				)) : (
					<main className='flex-1 flex items-center justify-center py-16 px-4'>
						<div className='text-center'>
							<h2 className='text-lg font-medium text-slate-900 mb-2'>There is no available requests</h2>
							<p className='text-slate-500 text-sm mb-6'>Wait till someone creates a request or see your requests in <Link className='text-teal-500' to='/profile'>profile</Link></p>
						</div>
					</main>
				)}
			</div>

			{selectedRequest && (
				<RequestInfoModal
					request={selectedRequest}
					categoryLabel={CATEGORIES.find(c => c.id === selectedRequest.category)?.label || 'Other'}
					isOpen={!!selectedRequest}
					onClose={() => setSelectedRequest(null)}
				/>
			)}
		</section>
	);
};

export default Dashboard;