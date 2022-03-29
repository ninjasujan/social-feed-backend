import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Model from '@feed-models/model';
import { feedDirectory, feedBaseUrl } from '@feed-constants/feed.constant';
import AuthorizationError from '@feed-exceptions/AuthorizationError';
import storageService from '@feed-service/v1/storage.service';
import APIError from '@feed-exceptions/APIError';

class Feeds {
    public createFeed = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const _id = Number(request.user._id);
            const { location, caption, type, userTag, hashTag } = request.body;
            let userTagList: Array<number> = Array.from(new Set(userTag));
            let hashTagList: Array<number> = Array.from(new Set(hashTag));
            const user = await Model.User.findByPk(_id);
            /** User validation check */
            if (!user) {
                throw new AuthorizationError(
                    'User not authorized to create a post',
                    401,
                );
            }
            /** Check for valid user tags */
            const userCount = await Model.User.count({
                where: {
                    _id: {
                        [Op.in]: [...userTagList],
                    },
                },
            });
            if (userCount !== userTagList.length) {
                throw new APIError('Please provide valid user tags', 400);
            }
            /** Check for valid hashtag */
            const hashtagCount = await Model.Post.count({
                where: {
                    _id: {
                        [Op.in]: hashTagList,
                    },
                },
            });
            if (hashtagCount !== hashTagList.length) {
                throw new APIError('Please provide valid hash tags', 400);
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
                        storageService.pushObjectToCloud(
                            file.localPath,
                            file.filePath,
                        ),
                    ),
                );
                resourceUrl = resourceUrl.map((file: any) => file.cloudPath);
            }
            /** Create post entry in DB */
            const postInstance = await Model.Post.create({
                userId: _id,
                type,
                caption,
                location,
                resourceUrl,
            });
            const post = postInstance.toJSON();
            /** Create HashTagt */
            const postHashTag = hashTagList.map((hash) => ({
                postId: post._id,
                hashTagId: hash,
            }));
            const postUserTag = userTagList.map((user) => ({
                userId: user,
                postId: post._id,
            }));
            await Model.PostHashTag.bulkCreate(postHashTag);
            await Model.UserPostTag.bulkCreate(postUserTag);
            response.status(200).json({
                status: 'success',
                message: 'Post created successfully',
                post,
            });
        } catch (error) {
            next(error);
        }
    };

    public getFeeds = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const _id = request.user._id;
            const feeds = await Model.Post.findAll({
                where: { _id: 2 },
                include: Model.User,
            });
            response.status(200).json({
                status: 'success',
                message: 'Feeds list',
                feeds,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new Feeds();
