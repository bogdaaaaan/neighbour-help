import { Outlet } from 'react-router';

import Navbar from '@/components/Layouts/Navbar/Navbar';

const Root = () => {
	return (
		<>
			<header className='sticky top-0 z-50'>
				<Navbar/>
			</header>

			<main>
				<Outlet />
			</main>

			<footer>

			</footer>
		</>

	);
};

export default Root;