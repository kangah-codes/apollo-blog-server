import { imageUpload } from "../../util/upload";
import Blog from "../../models/BlogPost";
import Comment from "../../models/PostComment";
import urlSlug from "url-slug";
import Author from "../../models/Author";

const postAuthor = async (authorId) => {
	try {
		const author = await Author.findById(authorId);

		return {
			...author._doc,
			id: author.id,
		};
	} catch (err) {
		throw err;
	}
};

const commentReplies = async (commentIds) => {
	try {
		const comments = await Comment.find({ _id: { $in: commentIds } });

		return comments.map((comment) => {
			return {
				...comment._doc,
				id: comment.id,
			};
		});
	} catch (err) {
		throw err;
	}
};

const postComment = async (commentIds) => {
	try {
		const comments = await Comment.find({ id: { $in: commentIds } });

		return comments.map((comment) => {
			return {
				...comment._doc,
				id: comment.id,
				replies: commentReplies(comment.replies),
			};
		});
	} catch (err) {
		throw err;
	}
};

export const blogs = async () => {
	const blogs = await Blog.find({});

	return blogs.map((blog) => {
		return {
			...blog._doc,
			id: blog.id,
			author: postAuthor.bind(this, blog._doc.author),
			comments: postComment.bind(this, blog._doc.comments),
		};
	});
};

export const createBlog = async (args) => {
	const { title, content, date, banner, author } = args.input;
	const slug = urlSlug(title);
	const blogBanner = await imageUpload(banner, `blogs/${slug}`);

	const blog = new Blog({
		title,
		content,
		date,
		banner: blogBanner,
		slug,
		author,
	});

	const result = await blog.save();

	if (!result) {
		throw new Error("Error creating blog post");
	}

	return {
		...result._doc,
		id: result.id,
		author: postAuthor.bind(this, result._doc.author),
	};
};

export const updateBlog = async (args) => {
	const { title, content, date, banner, likes, dislikes } = args.input;
	const { id } = args;

	const blog = await Blog.findByIdAndUpdate(
		id,
		{
			title,
			content,
			date,
			banner,
			likes,
			dislikes,
			slug: title ? urlSlug(title) : null,
		},
		{ new: true }
	);

	return {
		...blog._doc,
		id: blog.id,
	};
};

export const deleteBlog = async (args) => {
	const { id } = args;

	const blog = await Blog.findByIdAndDelete(id);

	if (!blog) {
		throw new Error("Blog not found");
	}

	return {
		...blog._doc,
		id: blog.id,
		message: "Deleted blog successfully",
	};
};

export const blog = async (args: { slug: string; id: string }) => {
	// query for the blog post either by it's slug or by it's id
	const { slug, id } = args;

	if (!slug && !id) {
		throw new Error("Blog not found. Provide a slug or an id");
	} else if (slug && id) {
		throw new Error("Provide a slug or an id, not both");
	}

	const blog = slug
		? await Blog.findOne({ slug: slug })
		: await Blog.findById(id);

	return {
		...blog._doc,
		id: blog.id,
	};
};
