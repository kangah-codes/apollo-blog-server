import { Env } from "./src/util/config";
import mongoose from "mongoose";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./src/graphql/schema";
import { authors, createAuthor } from "./src/graphql/resolvers";
import path from "path";

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
