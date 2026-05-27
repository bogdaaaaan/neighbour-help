import { createContext, useContext, useState } from 'react';
import type { User } from '@/types/common';

interface AuthContextType {
	user: User | null;
	login: (_id: string, _email: string, _name: string, _avatar?: string) => void;
	logout: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(() => {
		const stored = localStorage.getItem('nh_user');
		return stored ? JSON.parse(stored) : null;
	});

	const login = (id: string, email: string, name: string, profileImageUrl?: string) => {
		const newUser = { id, email, name, profileImageUrl };
		setUser(newUser);
		localStorage.setItem('nh_user', JSON.stringify(newUser));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('nh_user');
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('userName');
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) {throw new Error('useAuth must be used within AuthProvider');}
	return ctx;
};

export default AuthProvider;