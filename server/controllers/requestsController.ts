import { Request, Response } from 'express';
import RequestModel from '@/models/Request';

// @desc    Get all help requests
// @route   GET /api/requests
// @access  Public
const getAllRequests = async (req: Request, res: Response): Promise<void> => {
	try {
		const requests = await RequestModel.find()
			.populate('author', 'name email profileImageUrl')
			.sort({ createdAt: -1 });

		res.json(requests);
	} catch (error) {
		console.error('Error fetching requests: ', error);
		res.status(500).json({ message: 'Error fetching requests' });
	}
};

// @desc    Get request by ID
// @route   GET /api/requests/:id
// @access  Public
const getRequestById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const request = await RequestModel.findById(id).populate(
			'author',
			'name email profileImageUrl'
		);

		if (!request) {
			res.status(404).json({ message: 'Request not found' });
			return;
		}

		res.json(request);
	} catch (error) {
		console.error('Error fetching request: ', error);
		res.status(500).json({ message: 'Error fetching request' });
	}
};

// @desc    Get all requests by specific user
// @route   GET /api/requests/user/:userId
// @access  Public
const getUserRequests = async (req: Request, res: Response): Promise<void> => {
	try {
		const { userId } = req.params;

		const requests = await RequestModel.find({ author: userId })
			.populate('author', 'name email profileImageUrl')
			.sort({ createdAt: -1 });

		res.json(requests);
	} catch (error) {
		console.error('Error fetching user requests: ', error);
		res.status(500).json({ message: 'Error fetching user requests' });
	}
};

// @desc    Create a new help request
// @route   POST /api/requests/create
// @access  Private (Requires JWT)
const createRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user || !req.user._id) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const { title, category, description, status } = req.body;

		if (!title || !category || !description) {
			res.status(400).json({ message: 'Please provide title, category, and description' });
			return;
		}

		const newRequest = await RequestModel.create({
			title,
			category,
			description,
			status: status || 'open',
			author: req.user._id
		});

		res.status(201).json({
			id: newRequest._id,
			title: newRequest.title,
			category: newRequest.category,
			description: newRequest.description,
			author: newRequest.author,
			status: newRequest.status,
			createdAt: newRequest.createdAt,
		});

	} catch (error) {
		console.error('Error creating request: ', error);
		res.status(500).json({ message: 'Error creating request' });
	}
};


// @desc    Update help request
// @route   PUT /api/requests/:id
// @access  Private (Requires JWT, owner only)
const updateRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user || !req.user._id) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const { id } = req.params;
		const { title, category, description, status } = req.body;

		const request = await RequestModel.findById(id);

		if (!request) {
			res.status(404).json({ message: 'Request not found' });
			return;
		}

		if (request.author.toString() !== req.user._id.toString()) {
			res.status(403).json({ message: 'Not authorized to update this request' });
			return;
		}

		request.title = title || request.title;
		request.category = category || request.category;
		request.description = description || request.description;
		request.status = status || request.status;

		await request.save();

		res.json(request);
	} catch (error) {
		console.error('Error updating request: ', error);
		res.status(500).json({ message: 'Error updating request' });
	}
};

// @desc    Delete help request
// @route   DELETE /api/requests/:id
// @access  Private (Requires JWT, owner only)
const deleteRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user || !req.user._id) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const { id } = req.params;

		const request = await RequestModel.findById(id);

		if (!request) {
			res.status(404).json({ message: 'Request not found' });
			return;
		}

		if (request.author.toString() !== req.user._id.toString()) {
			res.status(403).json({ message: 'Not authorized to delete this request' });
			return;
		}

		await RequestModel.findByIdAndDelete(id);

		res.json({ message: 'Request deleted successfully' });
	} catch (error) {
		console.error('Error deleting request: ', error);
		res.status(500).json({ message: 'Error deleting request' });
	}
};


// @desc    Get current user's requests
// @route   GET /api/requests/my-requests
// @access  Private (Requires JWT)
const getMyRequests = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user || !req.user._id) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const requests = await RequestModel.find({ author: req.user._id })
			.populate('author', 'name email profileImageUrl')
			.sort({ createdAt: -1 });

		res.json(requests);
	} catch (error) {
		console.error('Error fetching user requests: ', error);
		res.status(500).json({ message: 'Error fetching user requests' });
	}
};

export {
	createRequest,
	getAllRequests,
	getRequestById,
	updateRequest,
	deleteRequest,
	getUserRequests,
	getMyRequests,
};