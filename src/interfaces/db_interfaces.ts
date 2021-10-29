import { PopulatedDoc, SchemaDefinitionProperty } from "mongoose";

export interface IDocument<T> {
	_doc: T;
}

export interface IAuthor extends Document, IDocument<IAuthor> {
	name: string;
	email: string;
	date: SchemaDefinitionProperty<Date>;
	about: string;
	avatar: string;
	createdAt: Date;
}

export interface IBlog extends Document, IDocument<IBlog> {
	title: string;
	content: string;
	date: SchemaDefinitionProperty<Date>;
	author: PopulatedDoc<IAuthor>;
	comments: PopulatedDoc<IComment>;
	likes: number;
	dislikes: number;
	banner: string;
	slug: string;
}

export interface IComment extends Document, IDocument<IComment> {
	name: string;
	comment: string;
	replies: Array<PopulatedDoc<IComment>>;
	post: PopulatedDoc<IBlog>;
}
