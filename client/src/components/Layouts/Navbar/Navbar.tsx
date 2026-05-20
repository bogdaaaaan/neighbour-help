import { Link } from 'react-router-dom';
import { UserCircleIcon } from 'lucide-react';

const Navbar = () => {
	return (
		<header className='sticky top-0 z-50'>
			<nav className='bg-white border-b border-slate-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<div className='flex items-center gap-8'>
							<Link to='/' className='text-xl text-slate-900 hover:text-teal-600 transition-colors'>
							NeighbourHelp
							</Link>

							<div className='hidden md:flex items-center gap-6'>
								<Link to='/dashboard' className='text-slate-600 hover:text-slate-900 transition-colors'>
								Browse Board
								</Link>
							</div>
						</div>

						<div className='flex items-center gap-4'>
							<Link to='/create' className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'>
							Create Request
							</Link>

							<button className='flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors'>
								<Link to='/profile' className='flex items-center justify-center'>
									<UserCircleIcon className='w-8 h-8 rounded-full text-teal-600 ' />
								</Link>
							</button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;