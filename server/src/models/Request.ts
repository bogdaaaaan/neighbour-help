import mongoose, { Document, Types } from 'mongoose';

export interface RequestDocument extends Document {
	title: string;
	category: string;
	description: string;
	author: Types.ObjectId;
	status: 'open' | 'in-progress' | 'completed' | 'closed';
	helper?: Types.ObjectId;
	location: String;
	createdAt: Date;
	updatedAt: Date;
}

const RequestSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	status: {
		type: String,
		enum: ['open', 'in-progress', 'completed', 'closed'],
		default: 'open',
	},
	helper: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default: null,
	},
	location: {
		type: String,
		required: true,
	}
}, { timestamps: true });

export default mongoose.model<RequestDocument>('Request', RequestSchema);