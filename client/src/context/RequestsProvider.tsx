import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from './AuthProvider';

import type { HelpRequest } from '@/types/common';

import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import { mapRequest } from '@/utils/mapper';


interface RequestsContextType {
	requests: HelpRequest[];
	userCreatedRequests: HelpRequest[];
	userActiveRequests: HelpRequest[];
	userAcceptedRequests: HelpRequest[];
	userCompletedRequests: HelpRequest[];

	addRequest: (_req: Omit<HelpRequest, 'id'>) => void;
	acceptRequest: (_req: HelpRequest) => void;
	completeRequest: (_req: HelpRequest) => void;
	deleteRequest: (_req: HelpRequest) => void;

	isCreateModalOpen: boolean;
	openCreateModal: () => void;
	closeCreateModal: () => void;
}

const RequestsContext = createContext<RequestsContextType | null>(null);

const RequestsProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth();
	const [requests, setRequests] = useState<HelpRequest[]>([]);

	const userCreatedRequests = requests.filter(r => r.author.id === user?.id);
	const userActiveRequests = requests.filter(r => r.author.id === user?.id && r.status !== 'completed');
	const userAcceptedRequests = requests.filter(r => r.helper?.id === user?.id && r.status === 'in-progress');
	const userCompletedRequests = requests.filter(r => r.helper?.id === user?.id && r.status === 'completed');

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const addRequest = async (req: Omit<HelpRequest, 'id'>) => {
		try {
			const response = await axiosInstance.post(API_PATHS.REQUESTS.CREATE_REQUEST, req);
			const mapped = mapRequest(response.data);

			setRequests(prev => [mapped, ...prev]);

			toast.success('Request posted successfully!');
		} catch (error) {
			toast.error('Failed to post a request');
			console.error(error);
		}
	};

	const acceptRequest = async (req: HelpRequest) => {
		try {
			const response = await axiosInstance.put(API_PATHS.REQUESTS.ACCEPT_REQUEST(req.id));
			const mapped = mapRequest(response.data);
			setRequests(prev => prev.map(r => r.id === mapped.id ? mapped : r));

			toast.success('Request accepted successfully!');
		} catch (error) {
			toast.error('Failed to accept a request');
			console.error(error);
		}
	};

	const completeRequest = async (req: HelpRequest) => {
		try {
			const response = await axiosInstance.put(API_PATHS.REQUESTS.COMPLETE_REQUEST(req.id));
			const mapped = mapRequest(response.data);
			setRequests(prev => prev.map(r => r.id === mapped.id ? mapped : r));

			toast.success('Request completed successfully!');
		} catch (error) {
			toast.error('Failed to complete a request');
			console.error(error);
		}
	};

	const deleteRequest = async (req: HelpRequest) => {
		try {
			const response = await axiosInstance.delete(API_PATHS.REQUESTS.DELETE_REQUEST(req.id));

			if (response.status == 200) {
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

				const mappedRequests: HelpRequest[] = response.data.map(mapRequest);
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
				userCreatedRequests,
				userActiveRequests,
				userAcceptedRequests,
				userCompletedRequests,
				addRequest,
				acceptRequest,
				completeRequest,
				deleteRequest,
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