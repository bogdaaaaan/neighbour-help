import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
	name: string;
	email: string;
	password: string;
	profileImageUrl?: string;
}

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	profileImageUrl: {
		type: String,
		set: (v: string) => v?.trim() === '' ? undefined : v,
	},
}, { timestamps: true });

export default mongoose.model<UserDocument>('User', UserSchema);