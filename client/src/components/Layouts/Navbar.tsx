import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className='container py-2.5 px-4 mx-auto flex items-center justify-between gap-5'>
			<Link to='/'>
				<h2 className='text-lg md:text-xl font-medium text-black leading-5'>
                    	NeighbourHelp
				</h2>
			</Link>

			<div>Profile Icon</div>
		</div>
	);
};

export default Navbar;