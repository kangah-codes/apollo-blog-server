import { Env } from "./src/util/config";
import mongoose from "mongoose";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./src/graphql/schema";
import { authors, createAuthor } from "./src/graphql/resolvers";
require("dotenv").config({
	path: `./.env`,
});

const app: express.Application = express();
const env = Env();

app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: {
			authors,
			createAuthor,
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
		.connect(
			"mongodb+srv://doadmin:gx5c091V2fX4o8Z3@graphql-blog-a5c5f5e2.mongo.ondigitalocean.com/admin?retryWrites=true&w=majority"
		)
		.then(() => {
			console.log("CONNECTED TO DATABASE SUCCESSFULLY!");
		})
		.catch((err) => {
			console.log("Error connecting to database!", err);
		});
});
