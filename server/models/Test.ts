import mongoose from 'mongoose';

const testSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		age: Number,
		hobbies: [String],
	},
);

export const TestModel = mongoose.model('Test', testSchema);