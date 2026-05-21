import { createBrowserRouter } from 'react-router';
import Root from './pages/Root/Root';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Root,
		children: [
			{ index: true, Component: Home },
			{ path: 'dashboard', Component: Dashboard },
			{ path: 'login', Component: Login },
			{ path: 'register', Component: Register },
			{ path: 'profile', Component: Profile },
			{ path: '*', Component: NotFound },
		],
	},
]);