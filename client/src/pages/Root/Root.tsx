import { Outlet } from 'react-router';

import Navbar from '@/components/Layouts/Navbar/Navbar';
import Footer from '@/components/Layouts/Footer/Footer';

const Root = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Navbar/>

			<main className='flex-1'>
				<Outlet />
			</main>

			<Footer/>
		</div>

	);
};

export default Root;