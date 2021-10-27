import { Env } from "./src/util/config";
import mongoose from "mongoose";
import express from "express";
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
} from "./src/graphql/resolvers";

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app: express.Application = express();
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
		},
		graphiql: true,
	})
);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(3000, () => {
	console.log("Example app listening on port 3000!");

	mongoose
		.connect(env.production.databaseURI)
		.then(() => {
			console.log("CONNECTED TO DATABASE SUCCESSFULLY!");
		})
		.catch((err) => {
			console.log("Error connecting to database!", err);
		});
});
