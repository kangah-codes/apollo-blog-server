import { IDocument } from "src/interfaces/db_interfaces";
import mongoose, {
	Document,
	Schema,
	model,
	SchemaDefinitionProperty,
	PopulatedDoc,
} from "mongoose";

export interface IComment extends Document, IDocument<IComment> {
	name: string;
	comment: string;
	replies: Array<PopulatedDoc<IComment>>;
}

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
