import { IEnv } from "../interfaces/app_interfaces";

export const Env = (env: NodeJS.ProcessEnv): IEnv => {
	return {
		production: {
			DATABASE_URI: env.DATABASE_URI,
			AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
			AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
			AWS_BUCKET: env.AWS_BUCKET,
		},
	};
};
