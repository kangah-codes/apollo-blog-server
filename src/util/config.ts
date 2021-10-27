export const Env = (env: NodeJS.ProcessEnv) => {
	return {
		production: {
			databaseURI: env.DATABASE_URI,
			AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
			AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
			AWS_BUCKET: env.AWS_BUCKET,
		},
	};
};
