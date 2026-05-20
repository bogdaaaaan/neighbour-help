import { createBrowserRouter } from 'react-router';
import Root from './pages/Root/Root';
import Dashboard from './pages/Dashboard/Dashboard';
import Authentication from './pages/Authentication/Authentication';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import { Home } from './pages/Home/Home';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Root,
		children: [
			{ index: true, Component: Home },
			{ path: 'dashboard', Component: Dashboard },
			{ path: 'auth', Component: Authentication },
			{ path: 'profile', Component: Profile },
			{ path: '*', Component: NotFound },
		],
	},
]);