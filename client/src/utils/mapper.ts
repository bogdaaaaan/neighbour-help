import type { HelpRequest, HelpRequestApi } from '@/types/common';

export const mapRequest = (request: HelpRequestApi): HelpRequest => {
	return {
		id: request._id,
		title: request.title,
		category: request.category,
		description: request.description,
		author: request.author,
		status: request.status,
		date: new Date(request.createdAt).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}),
	};
};