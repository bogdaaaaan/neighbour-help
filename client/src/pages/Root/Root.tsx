import { Outlet } from 'react-router';

import Navbar from '@/components/Layouts/Navbar';
import Footer from '@/components/Layouts/Footer';
import AuthProvider from '@/context/AuthContext';
import RequestsProvider from '@/context/RequestsProvider';
import RequestCreateModal from '@/components/Modals/RequestCreateModal';

const Root = () => {
	return (
		<AuthProvider>
			<RequestsProvider>
				<div className='min-h-screen flex flex-col'>
					<Navbar/>

					<main className='flex-1'>
						<Outlet />
					</main>

					<Footer/>

					<RequestCreateModal/>
				</div>
			</RequestsProvider>
		</AuthProvider>

	);
};

export default Root;