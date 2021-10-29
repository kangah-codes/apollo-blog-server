export interface IEnv {
	production: {
		DATABASE_URI: string;
		AWS_ACCESS_KEY_ID: string;
		AWS_SECRET_ACCESS_KEY: string;
		AWS_BUCKET: string;
	};
}
