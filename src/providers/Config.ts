import { S3Client } from '@aws-sdk/client-s3';
import Locals from '@feed-providers/Locals';

class Config {
    public static S3Client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: Locals.config().AWS_ACCESS_KEY,
            secretAccessKey: Locals.config().AWS_SECRET_KEY,
        },
    });
}

export default Config;
