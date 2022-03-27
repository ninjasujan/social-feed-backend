import { S3Client } from '@aws-sdk/client-s3';
import Locals from './Locals';

class Config {
  public static S3Client: S3Client;
  public static init = async () => {
    Config.S3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: Locals.config().AWS_ACCESS_KEY,
        secretAccessKey: Locals.config().AWS_SECRET_KEY,
      },
    });
  };
}

export default Config;
