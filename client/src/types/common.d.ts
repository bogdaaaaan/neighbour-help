import type { LucideIcon } from 'lucide-react';

export interface Category {
	id: string | null;
	label: string;
	icon: LucideIcon;
	color?: string;
}

export interface UserApi {
	_id: string;
	email: string;
	name: string;
	profileImageUrl?: string;
}

export interface User {
	id: string;
	email: string;
	name: string;
	profileImageUrl?: string;
}

export interface HelpRequestApi {
	_id: string;
	title: string;
	category: string;
	description: string;
	author: UserApi;
	status: string;
	helper: UserApi | null;
	location: string;
	createdAt: string;
	updatedAt: string;
}

export interface HelpRequest {
	id: string;
	title: string;
	category: string;
	description: string;
	author: User;
	status: string;
	helper: User | null;
	location: string;
	date: string;
}