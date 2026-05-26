import type { HelpRequest, HelpRequestApi } from '@/types/common';

export const mapRequest = (request: HelpRequestApi): HelpRequest => {
	return {
		id: request._id,
		title: request.title,
		category: request.category,
		description: request.description,
		author: request.author,
		status: request.status,
		date: formatFromString(request.updatedAt),
	};
};

export const formatFromString = (date: string): string => {
	return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatFromDate = (date: Date): string => {
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
