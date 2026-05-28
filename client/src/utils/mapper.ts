import type { HelpRequest, HelpRequestApi } from '@/types/common';

export const mapRequest = (request: HelpRequestApi): HelpRequest => {
	const new_helper = request.helper ? {
		id: request.helper._id,
		name: request.helper.name,
		email: request.helper.email,
		profileImageUrl: request.helper.profileImageUrl
	} : null;

	return {
		id: request._id,
		title: request.title,
		category: request.category,
		description: request.description,
		author: {
			id: request.author._id,
			name: request.author.name,
			email: request.author.email,
			profileImageUrl: request.author.profileImageUrl
		},
		status: request.status,
		helper: new_helper,
		location: request.location,
		date: formatFromString(request.updatedAt),
	};
};

export const formatFromString = (date: string): string => {
	return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatFromDate = (date: Date): string => {
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
