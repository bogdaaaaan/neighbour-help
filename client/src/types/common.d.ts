import type { LucideIcon } from 'lucide-react';

export interface Category {
	id: string | null;
	label: string;
	icon: LucideIcon;
}

export interface HelpRequest {
	id: number;
	title: string;
	category: string;
	description: string;
	author: string;
	date: string;
	status: string;
}