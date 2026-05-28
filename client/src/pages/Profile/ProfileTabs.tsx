import { useRequests } from '@/context/RequestsProvider';

interface ProfileTabsProps {
	activeTab: string;
	setActiveTab: (_tab: 'created' | 'active' | 'completed') => void
}

const ProfileTabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => {
	const { userActiveRequests, userAcceptedRequests, userCompletedRequests } = useRequests();

	return (<>
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
	</>
	);
};

export default ProfileTabs;