import type { LucideIcon } from 'lucide-react';

export interface Category {
	id: string | null;
	label: string;
	icon: LucideIcon;
	color?: string;
}

export interface User {
	id: string;
	email: string;
	fullName: string;
	avatar?: string;
}

export interface Author {
	_id: string;
	name: string;
	email: string;
}

export interface HelpRequestApi {
	_id: string;
	title: string;
	category: string;
	description: string;
	author: Author;
	status: string;
	createdAt: string;
	updatedAt: string;
}

export interface HelpRequest {
	id: string;
	title: string;
	category: string;
	description: string;
	author: Author;
	status: string;
	date: string;
}