import { PackageIcon, ShoppingCartIcon, WrenchIcon, MonitorIcon, PawPrintIcon, HelpCircleIcon } from 'lucide-react';

export const categories = [
	{ id: 'moving', label: 'Moving Help', icon: PackageIcon },
	{ id: 'shopping', label: 'Shopping Help', icon: ShoppingCartIcon },
	{ id: 'repairs', label: 'Small Repairs', icon: WrenchIcon },
	{ id: 'tech', label: 'Tech Help', icon: MonitorIcon },
	{ id: 'pet', label: 'Pet Care', icon: PawPrintIcon },
	{ id: 'other', label: 'Other', icon: HelpCircleIcon },
];

export const formatDate = (date: Date): string => {
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};