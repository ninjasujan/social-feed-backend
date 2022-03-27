import { PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import S3Config from '../../../providers/Config';
import Locals from '../../../providers/Locals';

class Storage {
  public pushObjectToCloud = async (localPath: string, filePath: string) => {
    const stream = fs.createReadStream(localPath);
    const command = new PutObjectCommand({
      Bucket: Locals.config().AWS_BUCKET_NAME,
      Body: stream,
      Key: filePath,
    });
    await S3Config.S3Client.send(command);
  };
}

export default new Storage();
