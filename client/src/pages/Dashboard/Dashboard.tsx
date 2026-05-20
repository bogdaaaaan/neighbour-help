import { useState } from 'react';
import { PackageIcon, ShoppingCartIcon, WrenchIcon, MonitorIcon, PawPrintIcon, HelpCircleIcon } from 'lucide-react';

import CategoryFilter from '@/components/Layouts/CategoryFilter/CategoryFilter';
import HelpRequestCard from '@/components/Cards/HelpRequestCard/HelpRequestCard';

const categories = [
	{ id: 'moving', label: 'Moving Help', icon: PackageIcon },
	{ id: 'shopping', label: 'Shopping Help', icon: ShoppingCartIcon },
	{ id: 'repairs', label: 'Small Repairs', icon: WrenchIcon },
	{ id: 'tech', label: 'Tech Help', icon: MonitorIcon },
	{ id: 'pet', label: 'Pet Care', icon: PawPrintIcon },
	{ id: 'other', label: 'Other', icon: HelpCircleIcon },
];

const helpRequests = [
	{
		id: 1,
		title: 'Carrying groceries to 3rd floor',
		category: 'moving',
		description:
			'Need help carrying heavy grocery bags from the parking lot to my apartment on the 3rd floor. No elevator available.',
		author: 'Sarah Martinez',
		date: '2 hours ago',
	},
	{
		id: 2,
		title: 'Help setting up WiFi router',
		category: 'tech',
		description:
			'Just moved in and struggling to configure my new router. Would appreciate some tech-savvy help!',
		author: 'Michael Chen',
		date: '3 hours ago',
	},
	{
		id: 3,
		title: 'Weekly grocery shopping assistance',
		category: 'shopping',
		description:
			'Elderly resident looking for help with weekly grocery shopping trip. Can provide list in advance.',
		author: 'Dorothy Williams',
		date: '5 hours ago',
	},
	{
		id: 4,
		title: 'Fix leaky kitchen faucet',
		category: 'repairs',
		description:
			'Small leak in kitchen faucet that needs tightening or washer replacement. Happy to provide tools.',
		author: 'James Rodriguez',
		date: '1 day ago',
	},
	{
		id: 5,
		title: 'Dog walking during work hours',
		category: 'pet',
		description:
			'Looking for someone to walk my golden retriever once a day while I\'m at work. Very friendly dog!',
		author: 'Emma Thompson',
		date: '1 day ago',
	},
	{
		id: 6,
		title: 'Help assembling bookshelf',
		category: 'other',
		description:
			'Just purchased an IKEA bookshelf and could use an extra pair of hands for assembly.',
		author: 'Alex Kumar',
		date: '2 days ago',
	},

	{
		id: 7,
		title: 'Moving sofa to new apartment',
		category: 'moving',
		description:
			'Need help transporting a sofa to a new apartment nearby. Small van would be ideal.',
		author: 'Daniel Weber',
		date: '3 hours ago',
	},
	{
		id: 8,
		title: 'Computer not turning on',
		category: 'tech',
		description:
			'Desktop PC suddenly stopped booting. Looking for someone to help diagnose the issue.',
		author: 'Anna Fischer',
		date: '6 hours ago',
	},
	{
		id: 9,
		title: 'Pick up prescription from pharmacy',
		category: 'shopping',
		description:
			'Unable to leave home today, need someone to pick up medication from local pharmacy.',
		author: 'Peter Schmidt',
		date: '8 hours ago',
	},
	{
		id: 10,
		title: 'Replace bathroom light bulb',
		category: 'repairs',
		description:
			'Ceiling light bulb in bathroom needs replacement. Step ladder required.',
		author: 'Laura Becker',
		date: '10 hours ago',
	},
	{
		id: 11,
		title: 'Walk small dog in the evening',
		category: 'pet',
		description:
			'Need help walking a small dachshund in the evenings for 20–30 minutes.',
		author: 'Julia Meyer',
		date: '12 hours ago',
	},
	{
		id: 12,
		title: 'Assemble IKEA bed frame',
		category: 'other',
		description:
			'New bed frame from IKEA needs assembly. Instructions included but prefer experienced help.',
		author: 'Markus Vogel',
		date: '1 day ago',
	},
	{
		id: 13,
		title: 'Help carrying laundry bags',
		category: 'moving',
		description:
			'Large laundry load needs to be carried to laundromat and back.',
		author: 'Sophie Klein',
		date: '2 days ago',
	},
	{
		id: 14,
		title: 'Install printer on laptop',
		category: 'tech',
		description:
			'Wireless printer setup not working on Windows laptop.',
		author: 'Thomas Braun',
		date: '2 days ago',
	},
	{
		id: 15,
		title: 'Buy groceries for elderly neighbor',
		category: 'shopping',
		description:
			'Weekly grocery run needed for elderly neighbor with mobility issues.',
		author: 'Nina Hoffmann',
		date: '3 days ago',
	},
	{
		id: 16,
		title: 'Fix dripping shower head',
		category: 'repairs',
		description:
			'Shower head keeps dripping even when turned off. Likely seal issue.',
		author: 'Kevin Schneider',
		date: '3 days ago',
	},
	{
		id: 17,
		title: 'Feed cat during vacation',
		category: 'pet',
		description:
			'Need someone to feed and check on cat once daily for a week.',
		author: 'Lisa Hartmann',
		date: '4 days ago',
	},
	{
		id: 18,
		title: 'Mount TV on wall',
		category: 'other',
		description:
			'Need help mounting a flat-screen TV securely on the wall.',
		author: 'Oliver Krüger',
		date: '4 days ago',
	},
	{
		id: 19,
		title: 'Carry furniture down stairs',
		category: 'moving',
		description:
			'Old furniture needs to be carried down from 2nd floor for disposal.',
		author: 'Hannah Neumann',
		date: '5 days ago',
	},
	{
		id: 20,
		title: 'Setup smart home device',
		category: 'tech',
		description:
			'Need help configuring smart lights and voice assistant.',
		author: 'Felix Wagner',
		date: '5 days ago',
	},
];

const Dashboard = () => {
	  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
					/>
				))}
			</div>
		</section>
	);
};

export default Dashboard;