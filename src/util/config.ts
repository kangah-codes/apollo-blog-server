export const Env = () => {
	return {
		production: {
			databaseURI: process.env.DATABASE_URI,
		},
	};
};
