import { ArrowRightIcon } from 'lucide-react';
import type { HelpRequest } from '@/types/common';

interface HelpRequestCardProps {
	request: HelpRequest;
	categoryLabel: string;
	onViewDetails: () => void;
}

const HelpRequestCard = ({ request, categoryLabel, onViewDetails }: HelpRequestCardProps) => {
	return (
		<div className='flex flex-col justify-between bg-white rounded-lg border border-slate-200 p-6 hover:border-teal-600 hover:shadow-md transition-all min-h-62.5'>
			<div className='flex items-start justify-between gap-3 mb-3'>
				<h3 className='text-slate-900 flex-1 line-clamp-2 min-h-[3em]'>{request.title}</h3>
				<span className='px-3 py-1 bg-teal-50 text-teal-700 rounded-md text-sm whitespace-nowrap'>
					{categoryLabel}
				</span>
			</div>

			<p className='text-slate-500 mb-4 line-clamp-2'>
				{request.description}
			</p>

			<div className='flex items-center justify-between pt-4 border-t border-slate-100'>
				<div className='text-sm'>
					<p className='text-slate-900'>{request.author.name}</p>
					<p className='text-slate-400'>{request.date}</p>
				</div>

				<button onClick={onViewDetails} className='flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors cursor-pointer'>
					<span className='text-sm'>View Details</span>
					<ArrowRightIcon className='w-4 h-4' />
				</button>
			</div>
		</div>
	);
};

export default HelpRequestCard;