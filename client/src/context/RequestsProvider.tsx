import { createContext, useContext, useEffect, useState } from 'react';
import type { HelpRequest } from '@/types/common';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import toast from 'react-hot-toast';
import { mapRequest } from '@/utils/mapper';

interface RequestsContextType {
	requests: HelpRequest[];
	userRequests: HelpRequest[];

	addRequest: (_req: Omit<HelpRequest, 'id'>) => void;
	deleteRequest: (_req: HelpRequest) => void;

	loadUserRequests: (_userId: string) => Promise<void>;

	isCreateModalOpen: boolean;
	openCreateModal: () => void;
	closeCreateModal: () => void;
}

const RequestsContext = createContext<RequestsContextType | null>(null);

const RequestsProvider = ({ children }: { children: React.ReactNode }) => {
	const [requests, setRequests] = useState<HelpRequest[]>([]);
	const [userRequests, setUserRequests] = useState<HelpRequest[]>([]);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const loadUserRequests = async (userId: string) => {
		try {
			const response = await axiosInstance.get(
				API_PATHS.REQUESTS.GET_USER_REQUESTS(userId)
			);

			if (!response.data) {
				throw new Error('Error fetching user requests');
			}

			const mapped = response.data.map(mapRequest);
			setUserRequests(mapped);
		} catch (error) {
			console.error(error);
		}
	};

	const addRequest = async (req: Omit<HelpRequest, 'id'>) => {
		try {
			const response = await axiosInstance.post(API_PATHS.REQUESTS.CREATE_REQUEST, {
				...req,
				author: req.author._id,
			});

			const newRequest = response.data;
			setRequests((prev) => [newRequest, ...prev]);
			toast.success('Request posted successfully!');
		} catch (error) {
			toast.error('Failed to posted a session');
			console.error(error);
		}
	};

	const deleteRequest = async (req: HelpRequest) => {
		try {
			const response = await axiosInstance.delete(API_PATHS.REQUESTS.DELETE_REQUEST(req.id));

			if (response.data) {
				setRequests(prev => prev.filter(r => r.id !== req.id));
				toast.success('Request deleted successfully!');
			}
		} catch (error) {
			toast.error('Failed to delete a request');
			console.error(error);
		}
	};

	useEffect(() => {
		const loadRequests = async () => {
			try {
				const response = await axiosInstance.get(API_PATHS.REQUESTS.GET_REQUESTS);

				if (!response.data) {
					throw Error('Error fetching requests');
				}

				const mappedRequests = response.data.map(mapRequest);
				// console.log(mappedRequests);
				setRequests(mappedRequests);
			} catch (error) {
				toast.error('Failed to fetch all requests');
				console.error(error);
			}
		};

		loadRequests();
	}, []);

	return (
		<RequestsContext.Provider
			value={{
				requests,
				userRequests,
				addRequest,
				deleteRequest,
				loadUserRequests,
				isCreateModalOpen,
				openCreateModal: () => setIsCreateModalOpen(true),
				closeCreateModal: () => setIsCreateModalOpen(false),
			}}
		>
			{children}
		</RequestsContext.Provider>
	);
};

export const useRequests = () => {
	const ctx = useContext(RequestsContext);
	if (!ctx) {throw new Error('useRequests must be used within RequestsProvider');}
	return ctx;
};

export default RequestsProvider;