// create a mongoose model for a blog post author

import { IAuthor, IDocument } from "../interfaces/db_interfaces";
import mongoose, {
	Document,
	Schema,
	model,
	SchemaDefinitionProperty,
} from "mongoose";

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
