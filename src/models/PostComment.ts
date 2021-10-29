import { IBlog, IComment, IDocument } from "../interfaces/db_interfaces";
import mongoose, {
	Document,
	Schema,
	model,
	SchemaDefinitionProperty,
	PopulatedDoc,
} from "mongoose";

export const CommentSchema = new Schema<IComment>({
	name: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	replies: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
