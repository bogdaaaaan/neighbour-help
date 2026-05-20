import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='border-t border-slate-200 bg-white mt-auto'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
					<div className='text-slate-500 text-sm'>
            © 2026 NeighbourHelp. Building stronger communities.
					</div>

					<div className='flex items-center gap-6 text-sm'>
						<Link to='/dashboard' className='text-slate-600 hover:text-slate-900 transition-colors'>
              Browse
						</Link>
						<Link to='/create' className='text-slate-600 hover:text-slate-900 transition-colors'>
              Create Request
						</Link>
						<Link to='/profile' className='text-slate-600 hover:text-slate-900 transition-colors'>
              Profile
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;