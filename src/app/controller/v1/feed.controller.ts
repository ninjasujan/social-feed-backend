import { Request, Response, NextFunction } from 'express';
import Model from '../../models/model';
import { feedDirectory, feedBaseUrl } from '../../../constants/feed.constant';
import AuthorizationError from '../../exceptions/AuthorizationError';
import storageService from '../../service/v1/storage.service';

class Feeds {
  public createFeed = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const _id = Number(request.user._id);
      const { location, caption } = request.body;
      console.log(request.body);
      const user = await Model.User.findByPk(_id);
      /** User validation check */
      if (!user) {
        throw new AuthorizationError(
          'User not authorized to create a post',
          401,
        );
      }
      const fileList: any = request.files;
      let resourceUrl = [];
      /** Upload attachement s3 if feed consist */
      if (fileList?.length) {
        resourceUrl = fileList.map((file: any) => ({
          localPath: file.path,
          filePath: `${feedDirectory}/${_id}/${file.originalname}`,
          cloudPath: `${feedBaseUrl}/${feedDirectory}/${_id}/${file.originalname}`,
        }));
        await Promise.all(
          resourceUrl.map((file: any) =>
            storageService.pushObjectToCloud(file.localPath, file.filePath),
          ),
        );
        resourceUrl = resourceUrl.map((file: any) => file.cloudPath);
        console.log(resourceUrl);
      }
      /** Create post entry in DB */
      const post = await Model.Post.create({
        userId: _id,
        caption,
        location,
        resourceUrl,
      });
      response.status(200).json({
        status: 'success',
        message: 'Post created successfully',
        post,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new Feeds();
