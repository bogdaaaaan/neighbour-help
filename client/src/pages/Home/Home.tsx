import { Link, useNavigate } from 'react-router';
import { HeartHandshakeIcon, UsersIcon, MapPinIcon, ShieldCheckIcon } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { useRequests } from '@/context/RequestsProvider';

const Home = () => {
	  const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const { openCreateModal } = useRequests();

	const handlePostRequest = () => {
		if (!isAuthenticated) {
			navigate('/register');
		} else {
			openCreateModal();
		}
	};

	return (
		<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			{/* Hero Section */}
			<section className='flex flex-col gap-8 text-center mt-12'>
				<h1 className='text-slate-900'>
					Helping Neighbors, Building Community
				</h1>
				<p className='text-slate-500 max-w-2xl mx-auto'>
					NeighbourHelp connects neighbors who need assistance with those willing to lend a hand.
					From carrying groceries to tech support, we make local help simple and accessible.
				</p>
				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<Link
						to='/dashboard'
						className='px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'
					>
						Browse Help Requests
					</Link>
					<button
						onClick={handlePostRequest}
						className='px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-lg hover:border-teal-600 transition-colors'
					>
						Post a Request
					</button>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
				<div className='text-center'>
					<div className='w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<HeartHandshakeIcon className='w-6 h-6 text-teal-600' />
					</div>
					<h3 className='text-slate-900 mb-2'>Community Support</h3>
					<p className='text-slate-500'>
						Connect with neighbors ready to help with everyday tasks
					</p>
				</div>

				<div className='text-center'>
					<div className='w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<MapPinIcon className='w-6 h-6 text-teal-600' />
					</div>
					<h3 className='text-slate-900 mb-2'>Hyperlocal</h3>
					<p className='text-slate-500'>
						Find help within your immediate neighborhood area
					</p>
				</div>

				<div className='text-center'>
					<div className='w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<UsersIcon className='w-6 h-6 text-teal-600' />
					</div>
					<h3 className='text-slate-900 mb-2'>Easy to Use</h3>
					<p className='text-slate-500'>
						Simple interface designed for all ages and tech levels
					</p>
				</div>

				<div className='text-center'>
					<div className='w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<ShieldCheckIcon className='w-6 h-6 text-teal-600' />
					</div>
					<h3 className='text-slate-900 mb-2'>Safe & Trusted</h3>
					<p className='text-slate-500'>
						Built on verified neighborhood connections and profiles
					</p>
				</div>
			</section>

			{/* How It Works Section */}
			<section className='pb-12 pt-6 bg-white rounded-lg border border-slate-200 px-6 md:px-12 mb-16'>
				<h2 className='text-center text-slate-900 mb-6'>How It Works</h2>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4'>1</div>
							<h3 className='text-slate-900 mb-2'>Post or Browse</h3>
						</div>
						<p className='text-slate-500'>
							Create a help request or browse existing requests from neighbors in your area
						</p>
					</div>

					<div>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4'>2</div>
							<h3 className='text-slate-900 mb-2'>Connect</h3>
						</div>
						<p className='text-slate-500'>
							Respond to requests or receive offers from willing neighbors
						</p>
					</div>

					<div>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4'>3</div>
							<h3 className='text-slate-900 mb-2'>Help Each Other</h3>
						</div>
						<p className='text-slate-500'>
							Complete the task, build relationships, and strengthen your community
						</p>
					</div>
				</div>
			</section>
		</section>
	);
};

export default Home;
