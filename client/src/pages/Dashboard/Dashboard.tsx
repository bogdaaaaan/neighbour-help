import { useState } from 'react';
import type { HelpRequest } from '@/types/common';

import CategoryFilter from '@/components/Layouts/CategoryFilter';
import HelpRequestCard from '@/components/Cards/HelpRequestCard';
import { RequestModal } from '@/components/Modals/RequestModal';

import { categories, helpRequests } from '@/utils/help_requests';

const Dashboard = () => {
	  const [activeCategory, setActiveCategory] = useState<string | null>(null);
	  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);

	const filteredRequests = activeCategory
		? helpRequests.filter(request => request.category === activeCategory)
		: helpRequests;

	return (
		<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<CategoryFilter
				categories={categories}
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
			/>

			<div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredRequests.map(request => (
					<HelpRequestCard
						key={request.id}
						request={request}
						categoryLabel={categories.find(c => c.id === request.category)?.label || 'Other'}
						onViewDetails={() => setSelectedRequest(request)}
					/>
				))}
			</div>

			{selectedRequest && (
				<RequestModal
					request={selectedRequest}
					categoryLabel={categories.find(c => c.id === selectedRequest.category)?.label || 'Other'}
					isOpen={!!selectedRequest}
					onClose={() => setSelectedRequest(null)}
				/>
			)}
		</section>
	);
};

export default Dashboard;