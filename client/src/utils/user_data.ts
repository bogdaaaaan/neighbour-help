import {
	PackageIcon,
	ShoppingCartIcon,
	WrenchIcon,
	MonitorIcon,
	PawPrintIcon,
	HelpCircleIcon,
} from 'lucide-react';

import type { HelpRequest } from '@/types/common';

export const categoryMeta: Record<string, { label: string; icon: React.ElementType; color: string }> = {
	moving: { label: 'Moving Help', icon: PackageIcon, color: 'text-violet-500 bg-violet-50' },
	shopping: { label: 'Shopping Help', icon: ShoppingCartIcon, color: 'text-amber-500 bg-amber-50' },
	repairs: { label: 'Small Repairs', icon: WrenchIcon, color: 'text-orange-500 bg-orange-50' },
	tech: { label: 'Tech Help', icon: MonitorIcon, color: 'text-blue-500 bg-blue-50' },
	pet: { label: 'Pet Care', icon: PawPrintIcon, color: 'text-pink-500 bg-pink-50' },
	other: { label: 'Other', icon: HelpCircleIcon, color: 'text-slate-500 bg-slate-100' },
};

export const myRequests: HelpRequest[] = [
	{
		id: 101,
		title: 'Help assembling wardrobe',
		category: 'other',
		description: 'New IKEA wardrobe arrived, need an extra pair of hands for 2–3 hours.',
		date: 'May 18, 2026',
		author: 'Sarah Martinez',
		status: 'open',
	},
	{
		id: 102,
		title: 'Fix bathroom tap drip',
		category: 'repairs',
		description: 'Small constant drip from the hot tap. Tools and parts already purchased.',
		date: 'May 14, 2026',
		author: 'Sarah Martinez',
		status: 'in_progress',
	},
	{
		id: 103,
		title: 'Pick up parcel from post office',
		category: 'shopping',
		description: 'Missed the delivery window. Post office is 10 min walk, happy to reimburse travel.',
		date: 'May 9, 2026',
		author: 'Sarah Martinez',
		status: 'done',
	},
	{
		id: 104,
		title: 'Set up new laptop',
		category: 'tech',
		description: 'Moving files and apps from an old Windows machine to a new one.',
		date: 'Apr 28, 2026',
		author: 'Sarah Martinez',
		status: 'done',
	},
];

export const completedRequests: HelpRequest[] = [
	{
		id: 201,
		title: 'Carrying groceries to 3rd floor',
		category: 'moving',
		description: 'Helped Sarah carry heavy grocery bags from the parking lot.',
		date: 'May 17, 2026',
		author: 'Sarah Martinez',
		status: 'done',
	},
	{
		id: 202,
		title: 'Weekly grocery run for Dorothy',
		category: 'shopping',
		description: 'Completed a weekly grocery shopping trip for an elderly neighbour.',
		date: 'May 10, 2026',
		author: 'Sarah Martinez',
		status: 'done',
	},
	{
		id: 203,
		title: 'Dog walking during work hours',
		category: 'pet',
		description: 'Walked Emma\'s golden retriever once a day for a week.',
		date: 'Apr 22, 2026',
		author: 'Sarah Martinez',
		status: 'done',
	},
];