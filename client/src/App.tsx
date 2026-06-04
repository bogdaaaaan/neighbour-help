import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster toastOptions={{ className: '', style: { fontSize: '13px' } }} />
			{console.log('For people who test/use this project: server is deployed with "Render", so after 50 sec. period without any actions, server will slow down significantly. Wait a little before any data shows.')}
		</>
	);
};

export default App;