import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon, LogOutIcon, UserCircleIcon } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';


const Navbar = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);

	const handleCreateRequest = () => {
		if (!isAuthenticated) {
			navigate('/register');
		} else {
			navigate('/create');
		}
	};

	const handleProfileClick = () => {
		if (!isAuthenticated) {
			navigate('/register');
		} else {
			setMenuOpen((v) => !v);
		}
	};

	const handleLogout = () => {
		setMenuOpen(false);
		logout();
		navigate('/');
	};

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

						<div className='flex items-center gap-3'>
							<button
								onClick={handleCreateRequest}
								className='px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors'
							>
								Create Request
							</button>

							{/* Profile area */}
							<div className='relative' ref={menuRef}>
								<button
									onClick={handleProfileClick}
									className='flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors focus:outline-none'
								>
									<div className='w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden'>
										{user?.avatar ? (
											<img src={user.avatar} alt={user.fullName} className='w-full h-full object-cover' />
										) : user ? (
											<span className='text-xs font-semibold text-teal-700'>
												{user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
											</span>
										) : (
											<UserCircleIcon className='w-5 h-5 text-teal-600' />
										)}
									</div>
									{isAuthenticated && <ChevronDownIcon className='w-4 h-4 hidden sm:block text-slate-400' />}
								</button>

								{/* Dropdown */}
								{isAuthenticated && menuOpen && (
									<div className='absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-10'>
										<div className='px-4 py-3 border-b border-slate-100'>
											<p className='text-sm font-medium text-slate-900 truncate'>{user?.fullName}</p>
											<p className='text-xs text-slate-500 truncate'>{user?.email}</p>
										</div>
										<Link
											to='/profile'
											onClick={() => setMenuOpen(false)}
											className='flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors'
										>
											<UserCircleIcon className='w-4 h-4 text-slate-400' />
											My Profile
										</Link>
										<button
											onClick={handleLogout}
											className='flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors'
										>
											<LogOutIcon className='w-4 h-4' />
											Sign out
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;