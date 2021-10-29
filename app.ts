import { Env } from "./src/util/config";
import mongoose from "mongoose";
import express, { Application, NextFunction, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./src/graphql/schema";
import path from "path";
import {
	blogs,
	createBlog,
	blog,
	updateBlog,
	deleteBlog,
	createComment,
	deleteComment,
	replyComment,
	author,
	authors,
	createAuthor,
	likeComment,
	dislikeComment,
} from "./src/graphql/resolvers";

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app: Application = express();
const env = Env(process.env);

app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: {
			authors,
			createAuthor,
			author,
			blogs,
			createBlog,
			blog,
			updateBlog,
			deleteBlog,
			createComment,
			deleteComment,
			replyComment,
			likeComment,
			dislikeComment,
		},
		graphiql: true,
	})
);

// error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(3000, () => {
	console.log("Example app listening on port 3000!");

	mongoose
		.connect(env.production.DATABASE_URI)
		.then(() => {
			console.log("CONNECTED TO DATABASE SUCCESSFULLY!");
		})
		.catch((err) => {
			console.log("Error connecting to database!", err);
		});
});
