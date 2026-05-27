import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from 'lucide-react';

import type { HelpRequest } from '@/types/common';

import { CATEGORIES, statusConfig } from '@/utils/categories';

type RequestRowProps = {
	request: HelpRequest;
	personal: boolean;
	onDelete?: (_req: HelpRequest) => void;
	onComplete?: (_req: HelpRequest) => void;
};

export const RequestRow = ({ request, personal, onDelete, onComplete }: RequestRowProps) => {
	const meta = CATEGORIES.filter(x => x.id == request.category)[0];
	const Icon = meta.icon;
	const status = statusConfig[request.status];

	return (
		<div className='flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all'>
			<div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${meta.color}`}>
				<Icon className='w-4 h-4' />
			</div>
			<div className='flex-1 min-w-0'>
				<div className='flex items-start justify-between gap-3'>
					<p className='text-sm font-medium text-slate-900 leading-snug'>{request.title}</p>
				</div>
				<p className='text-xs text-slate-500 mt-1 line-clamp-1'>{request.description}</p>
				<div className='flex items-center gap-1.5 mt-2'>
					<CalendarIcon className='w-3 h-3 text-slate-400' />
					<span className='text-xs text-slate-400'>{request.date}</span>
					<span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${status.classes}`}>
						{status.label}
					</span>
				</div>
				<div className='flex items-center gap-1.5 mt-4'>
					{personal && onComplete && request.status === 'in-progress' && (
						<button
							onClick={() => onComplete(request)}
							className='flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm bg-teal-100 text-teal-400 hover:text-teal-600 hover:bg-teal-200 transition-colors cursor-pointer'
						>
							Mark as completed
						</button>
					)}

					{personal && onDelete && (
						<button
							onClick={() => onDelete(request)}
							className='flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm bg-red-100 text-red-400 hover:text-red-600 hover:bg-red-200 transition-colors cursor-pointer'
						>
							Delete
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export const EmptyState = ({ message, actionLabel, actionTo }: { message: string; actionLabel: string; actionTo: string }) => {
	return (
		<div className='flex flex-col items-center justify-center py-16 text-center'>
			<div className='w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4'>
				<ClockIcon className='w-6 h-6 text-slate-400' />
			</div>
			<p className='text-sm text-slate-500 mb-4'>{message}</p>
			<Link
				to={actionTo}
				className='inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors'
			>
				{actionLabel}
				<ArrowRightIcon className='w-3.5 h-3.5' />
			</Link>
		</div>
	);
};