import { Outlet } from 'react-router';

import Navbar from '@/components/Layouts/Navbar';
import Footer from '@/components/Layouts/Footer';
import { AuthProvider } from '@/context/AuthContext';

const Root = () => {
	return (
		<AuthProvider>
			<div className='min-h-screen flex flex-col'>
				<Navbar/>

				<main className='flex-1'>
					<Outlet />
				</main>

				<Footer/>
			</div>
		</AuthProvider>

	);
};

export default Root;