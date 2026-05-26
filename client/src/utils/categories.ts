import { PackageIcon, ShoppingCartIcon, WrenchIcon, MonitorIcon, PawPrintIcon, HelpCircleIcon } from 'lucide-react';

import type { Category } from '@/types/common';

export const CATEGORIES: Category[] = [
	{ id: 'moving', label: 'Moving Help', icon: PackageIcon, color: 'text-violet-500 bg-violet-50' },
	{ id: 'shopping', label: 'Shopping Help', icon: ShoppingCartIcon, color: 'text-amber-500 bg-amber-50' },
	{ id: 'repairs', label: 'Small Repairs', icon: WrenchIcon, color: 'text-orange-500 bg-orange-50' },
	{ id: 'tech', label: 'Tech Help', icon: MonitorIcon, color: 'text-blue-500 bg-blue-50' },
	{ id: 'pet', label: 'Pet Care', icon: PawPrintIcon, color: 'text-pink-500 bg-pink-50' },
	{ id: 'other', label: 'Other', icon: HelpCircleIcon, color: 'text-slate-500 bg-slate-100' },
];

export const statusConfig: Record<string, { label: string; classes: string }> = {
	'open': { label: 'Open', classes: 'bg-teal-50 text-teal-700' },
	'in-progress': { label: 'In Progress', classes: 'bg-amber-50 text-amber-700' },
	'done': { label: 'Done', classes: 'bg-slate-100 text-slate-500' },
};