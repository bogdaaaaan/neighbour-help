import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';

const App = () => {
	return (
		<>
			<RouterProvider router={router} />;
			<Toaster toastOptions={{ className: '', style: { fontSize: '13px' } }} />
		</>
	);
};

export default App;