import { X, MapPinIcon, ClockIcon, UserIcon } from 'lucide-react';
import type { HelpRequest } from '@/types/common';

interface RequestModalProps {
  request: HelpRequest;
  categoryLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

const RequestInfoModal = ({ request, categoryLabel, isOpen, onClose }: RequestModalProps) => {
	if (!isOpen) {return null;}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
			{/* Backdrop with blur */}
			<div
				className='fixed inset-0 bg-slate-900/20 backdrop-blur-sm cursor-pointer'
				onClick={onClose}
			/>

			{/* Modal */}
			<div className='relative bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-start justify-between'>
					<div className='flex-1'>
						<span className='inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-md text-sm mb-3'>
							{categoryLabel}
						</span>
						<h2 className='text-slate-900'>{request.title}</h2>
					</div>
					<button
						onClick={onClose}
						className='ml-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Content */}
				<div className='px-6 py-4'>
					{/* Meta Information */}
					<div className='flex flex-wrap gap-4 mb-6 text-sm'>
						<div className='flex items-center gap-2 text-slate-600'>
							<UserIcon className='w-4 h-4' />
							<span>{request.author}</span>
						</div>
						<div className='flex items-center gap-2 text-slate-600'>
							<ClockIcon className='w-4 h-4' />
							<span>{request.date}</span>
						</div>
						<div className='flex items-center gap-2 text-slate-600'>
							<MapPinIcon className='w-4 h-4' />
							<span>Local neighborhood</span>
						</div>
					</div>

					{/* Description */}
					<div className='mb-6'>
						<h3 className='text-slate-900 mb-3'>Description</h3>
						<p className='text-slate-600 leading-relaxed'>
							{request.description}
						</p>
					</div>

					{/* Additional Details */}
					<div className='bg-slate-50 rounded-lg p-4'>
						<h4 className='text-slate-900 mb-2'>Additional Information</h4>
						<p className='text-slate-600 text-sm'>
							Please reach out if you're available to help. Response time is typically within a few hours.
						</p>
					</div>
				</div>

				{/* Footer Actions */}
				<div className='sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex gap-3'>
					<button className='flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer'>
						Offer Help
					</button>
					<button
						onClick={onClose}
						className='px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default RequestInfoModal;