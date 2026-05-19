import { Outlet } from 'react-router';

import Navbar from '../../components/Layouts/Navbar';

const Root = () => {
	return (
		<>
			<Navbar/>
			<div className='container py-2.5 px-4 mx-auto'>
				<Outlet />
			</div>
		</>

	);
};

export default Root;