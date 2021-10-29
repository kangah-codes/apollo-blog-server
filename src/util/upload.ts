import AWS from "aws-sdk";
import { Env } from "./config";

const env = Env(process.env);

export const imageUpload = async (
	base64: string,
	fileName: string
): Promise<string> => {
	try {
		const s3 = new AWS.S3({
			accessKeyId: env.production.AWS_ACCESS_KEY_ID,
			secretAccessKey: env.production.AWS_SECRET_ACCESS_KEY,
			endpoint: new AWS.Endpoint("sfo3.digitaloceanspaces.com"),
		});

		const base64Data = Buffer.from(
			base64.replace(/^data:image\/\w+;base64,/, ""),
			"base64"
		);
		const imageType = base64.split(";")[0].split("/")[1];

		const params = {
			Bucket: "apollo-blog-server",
			Key: `${fileName}.${imageType}`,
			Body: base64Data,
			ACL: "public-read",
			ContentEncoding: "base64",
			ContentType: `image/${imageType}`,
		};

		const { Location } = await s3.upload(params).promise();

		return Location;
	} catch (error) {
		throw new Error(
			"Error parsing base64 image string, are you sure it's a valid string?"
		);
	}
};
