import mongoose, { model, models, Schema, Model, Document } from 'mongoose';

interface UserProps extends Document {
	name: string;
	email: string;
	password : string;
	isAdmin: boolean;
}

const userSchema:Schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password : { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false }
	},
	{
		timestamps: true,
	}
);

const User: Model<UserProps> = models.User || model('User', userSchema);
export default User;