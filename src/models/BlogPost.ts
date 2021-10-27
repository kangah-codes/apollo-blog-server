import Author, { AuthorSchema, IAuthor } from "./Author";
import mongoose, {
	Document,
	Schema,
	model,
	SchemaDefinitionProperty,
	PopulatedDoc,
} from "mongoose";
import { IComment } from "./PostComment";
import { IDocument } from "src/interfaces/db_interfaces";

interface IBlog extends Document, IDocument<IBlog> {
	title: string;
	content: string;
	date: SchemaDefinitionProperty<Date>;
	author: PopulatedDoc<IAuthor>;
	comments: PopulatedDoc<IComment>;
	likes: number;
	dislikes: number;
	banner: string;
}

const BlogSchema = new Schema<IBlog>({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "Author",
		required: true,
	},
	comments: {
		type: [Schema.Types.ObjectId],
		ref: "Comment",
		required: true,
	},
	likes: {
		type: Number,
		required: true,
		default: 0,
	},
	dislikes: {
		type: Number,
		required: true,
		default: 0,
	},
	banner: {
		type: String,
		required: false,
	},
});

const Blog = model<IBlog>("Blog", BlogSchema);

export default Blog;
