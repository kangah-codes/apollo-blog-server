import { imageUpload } from "../../util/upload";
import Author from "../../models/Author";

export const authors = async () => {
	const authors = await Author.find();

	return authors.map((author) => {
		return {
			...author._doc,
			id: author.id,
		};
	});
};

export const createAuthor = async (args) => {
	const { name, email, date, about, avatar } = args.input;
	const location = avatar
		? await imageUpload(avatar, `authors/${email}`)
		: "https://apollo-blog-server.sfo3.digitaloceanspaces.com/authors/avatar.png";

	const author = new Author({
		name,
		email,
		date,
		about,
		avatar: location,
	});

	const result = await author.save();

	return {
		...result._doc,
		id: result.id,
	};
};
