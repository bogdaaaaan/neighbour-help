import { createContext, useContext, useEffect, useState } from 'react';
import type { HelpRequest } from '@/types/common';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import toast from 'react-hot-toast';
import { mapRequest } from '@/utils/mapper';


interface RequestsContextType {
	requests: HelpRequest[];
	addRequest: (_req: Omit<HelpRequest, 'id'>) => void;
	isCreateModalOpen: boolean;
	openCreateModal: () => void;
	closeCreateModal: () => void;
}

const RequestsContext = createContext<RequestsContextType | null>(null);

const RequestsProvider = ({ children }: { children: React.ReactNode }) => {
	const [requests, setRequests] = useState<HelpRequest[]>([]);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const addRequest = async (req: Omit<HelpRequest, 'id'>) => {
		try {
			const response = await axiosInstance.post(API_PATHS.REQUESTS.CREATE_REQUEST, {
				...req,
				author: req.author._id,
			});

			console.log(req);

			const newRequest = response.data;
			setRequests((prev) => [newRequest, ...prev]);
			toast.success('Request posted successfully!');
		} catch (error) {
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
				addRequest,
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