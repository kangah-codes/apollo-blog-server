import Blog from "../../models/BlogPost";
import Comment from "../../models/PostComment";

export const createComment = async (args) => {
	const { name, comment, blog } = args.input;
	const postComment = new Comment({
		name,
		comment,
	});

	const result = await postComment.save();

	await Blog.findByIdAndUpdate(blog, {
		$push: {
			comments: result.id,
		},
	});

	return {
		...result._doc,
		id: result.id,
	};
};

export const deleteComment = async (args) => {
	const { id } = args;

	const result = await Comment.findByIdAndDelete(id);

	if (!result) {
		throw new Error("Comment not found");
	}

	return {
		...result._doc,
		id: result.id,
	};
};

export const replyComment = async (args) => {
	console.log(args);
	const { name, comment, parentComment } = args.input;

	const replyComment = new Comment({
		name,
		comment,
	});

	const result = await replyComment.save();

	await Comment.findByIdAndUpdate(parentComment, {
		$push: {
			replies: result.id,
		},
	});

	return {
		...result._doc,
		id: result.id,
	};
};

export const likeComment = async (args) => {
	const { id } = args;

	const result = await Comment.findByIdAndUpdate(id, {
		$inc: {
			likes: 1,
		},
	});

	if (!result) {
		throw new Error("Comment not found");
	}

	return {
		...result._doc,
		id: result.id,
	};
};

export const dislikeComment = async (args) => {
	const { id } = args;

	const result = await Comment.findByIdAndUpdate(id, {
		$inc: {
			dislikes: 1,
		},
	});

	if (!result) {
		throw new Error("Comment not found");
	}

	return {
		...result._doc,
		id: result.id,
	};
};
