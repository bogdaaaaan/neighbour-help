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
	const [showPersonal, setShowPersonal] = useState(false);

	const requestsFromOthers = requests.filter(r => r.author.id !== user?.id && r.status == 'open');
	const requestsPersonal = requests.filter(r => r.author.id == user?.id);

	const filteredOtherRequests = activeCategory
		? requestsFromOthers.filter(request => request.category === activeCategory)
		: requestsFromOthers;

	const filteredPersonalRequests = activeCategory
		? requestsPersonal.filter(request => request.category === activeCategory)
		: requestsPersonal;

	return (
		<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<CategoryFilter
				categories={CATEGORIES}
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
			/>

			<div className={`mt-8 grid grid-cols-1 ${filteredOtherRequests.length > 0 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}>
				{filteredOtherRequests.length > 0 ? filteredOtherRequests.map(request => (
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

				<div className='flex  items-center justify-center mt-4 mb-4'>
					<button
						className='w-1/3 items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-slate-100 text-slate-500 hover:text-slate-700'
						onClick={() => setShowPersonal(!showPersonal)}
					>
						{showPersonal ? 'Hide your requests' : 'Show your requests'}
					</button>
				</div>

				<div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{showPersonal && filteredPersonalRequests.map(request => (
						<HelpRequestCard
							key={request.id}
							request={request}
							categoryLabel={CATEGORIES.find(c => c.id === request.category)?.label || 'Other'}
							onViewDetails={() => setSelectedRequest(request)}
						/>
					))}
				</div>
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