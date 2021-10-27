import { buildSchema, GraphQLScalarType, Kind } from "graphql";

// create a scalar to represent date
export const DateScalar = new GraphQLScalarType({
	name: "Date",
	description: "Date custom scalar type",
	parseValue(value) {
		return new Date(value); // value from the client
	},
	serialize(value) {
		return value.getTime(); // value sent to the client
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value); // ast value is always in string format
		}
		return null;
	},
});

export default buildSchema(`
    scalar Date

    type BlogPost {
        id: ID!
        title: String!
        content: String!
        date: Date!
        likes: Int!
        dislikes: Int!
        banner: String!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        name: String!
        comment: Date!
        replies: [Comment!]
    }

    type Author {
        id: ID!
        name: String!
        email: String!
        date: Date!
        about: String!
        avatar: String!
    }

    input BlogPostInput {
        title: String!
        content: String!
        date: Date!
        banner: String!
    }

    input CommentInput {
        name: String!
        comment: String!
        blogPostId: ID!
    }

    input AuthorInput {
        name: String!
        email: String!
        date: Date!
        about: String!
        avatar: String
    }

    type Query {
        blogPosts: [BlogPost!]!
        blogPost(id: ID!): BlogPost!
        authors: [Author!]!
        author(id: ID!): Author!
    }

    type Mutation {
        createBlogPost(input: BlogPostInput): BlogPost!
        createComment(input: CommentInput): Comment!
        createAuthor(input: AuthorInput): Author!
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);
