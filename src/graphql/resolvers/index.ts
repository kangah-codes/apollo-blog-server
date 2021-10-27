import Author from "../../models/Author";

export const authors = async () => {
	const authors = await Author.find();

	return authors.map((author) => {
		return {
			...author._doc,
			_id: author.id,
			createdAt: new Date(author._doc.createdAt).toISOString(),
		};
	});
};

export const createAuthor = async (args) => {
	const { name, email, date, about, avatar } = args.input;

	const author = new Author({
		name,
		email,
		date,
		about,
		avatar,
	});

	const result = await author.save();

	return {
		...result._doc,
		_id: result.id,
		createdAt: new Date(result._doc.createdAt).toISOString(),
	};
};
