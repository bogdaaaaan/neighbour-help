import { helpRequests } from '@/utils/help_requests';
import { createContext, useContext, useState } from 'react';
import type { HelpRequest } from '@/types/common';


interface RequestsContextType {
	requests: HelpRequest[];
	addRequest: (_req: Omit<HelpRequest, 'id'>) => void;
	isCreateModalOpen: boolean;
	openCreateModal: () => void;
	closeCreateModal: () => void;
}

const RequestsContext = createContext<RequestsContextType | null>(null);

const RequestsProvider = ({ children }: { children: React.ReactNode }) => {
	const [requests, setRequests] = useState<HelpRequest[]>(helpRequests);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const addRequest = (req: Omit<HelpRequest, 'id'>) => {
		setRequests((prev) => [{ ...req, id: Date.now() }, ...prev]);
	};

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

export function useRequests() {
	const ctx = useContext(RequestsContext);
	if (!ctx) {throw new Error('useRequests must be used within RequestsProvider');}
	return ctx;
}

export default RequestsProvider;