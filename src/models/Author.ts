// create a mongoose model for a blog post author

import { IDocument } from "src/interfaces/db_interfaces";
import mongoose, {
	Document,
	Schema,
	model,
	SchemaDefinitionProperty,
} from "mongoose";

export interface IAuthor extends Document, IDocument<IAuthor> {
	name: string;
	email: string;
	date: SchemaDefinitionProperty<Date>;
	about: string;
	avatar: string;
	createdAt: Date;
}

export const AuthorSchema = new Schema<IAuthor>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	about: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: false,
	},
});

const Author = mongoose.model("Author", AuthorSchema);

export default Author;
