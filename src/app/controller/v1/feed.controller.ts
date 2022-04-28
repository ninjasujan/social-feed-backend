import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Model from '@feed-models/model';
import {
    feedDirectory,
    feedBaseUrl,
    postType,
} from '@feed-constants/feed.constant';
import AuthorizationError from '@feed-exceptions/AuthorizationError';
import storageService from '@feed-service/v1/storage.service';
import APIError from '@feed-exceptions/APIError';
import { IPostModel } from '@feed-models/post.model';
import { IHashTagModel } from '@feed-models/hashtag.model';

/**
 * Feeds Class
 */
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
            const hashtagCount = await Model.HashTag.count({
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
            let feed: IHashTagModel | IPostModel;
            if (type === postType.POST) {
                const feedInstance = await Model.Post.create({
                    userId: _id,
                    caption,
                    location,
                    resourceUrl,
                });
                feed = feedInstance.toJSON();
                const postHashTag = hashTagList.map((hash) => ({
                    postId: feed._id,
                    hashTagId: Number(hash),
                }));
                const userPostTag = userTagList.map((user) => ({
                    userId: Number(user),
                    postId: feed._id,
                }));
                await Model.PostHashTag.bulkCreate(postHashTag);
                await Model.UserPostTag.bulkCreate(userPostTag);
            } else {
                const feedInstance = await Model.HashTag.create({
                    userId: _id,
                    caption,
                    location,
                    resourceUrl,
                });
                feed = feedInstance.toJSON();
            }
            response.status(200).json({
                status: 'success',
                message: 'Post created successfully',
                feed,
            });
        } catch (error) {
            next(error);
        }
    };

    public getUsersFeeds = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const { userIds } = request.body;
            const userFeeds: any = await Model.User.findAll({
                where: {
                    _id: {
                        [Op.in]: userIds,
                    },
                },
                attributes: {
                    exclude: ['password', 'salt'],
                },
                include: [
                    {
                        model: Model.Post,
                        as: 'userPost',
                    },
                ],
            });
            const updatedUsersFeed = [];
            for (let i = 0; i < userFeeds.length; i++) {
                const userFeed = userFeeds[i].toJSON();
                for (let i = 0; i < userFeed?.userPost?.length; i++) {
                    const like = await Model.Likes.count({
                        where: { postId: userFeed.userPost[i]._id },
                    });
                    userFeed.userPost[i].like = like;
                    const users = await Model.UserPostTag.findAll({
                        where: { postId: userFeed.userPost[i]._id },
                        include: {
                            model: Model.User,
                            as: 'post_usertag_user',
                            attributes: {
                                exclude: [
                                    'password',
                                    'salt',
                                    'createdAt',
                                    'updatedAt',
                                ],
                            },
                        },
                    });
                    if (users.length) {
                        userFeed.userPost[i].taggedUser = users.map(
                            (user: any) => user?.post_usertag_user,
                        );
                    }
                }
                updatedUsersFeed.push(userFeed);
            }
            response.status(200).json({
                status: 'success',
                message: 'Feeds list',
                userFeeds: updatedUsersFeed,
            });
        } catch (error) {
            next(error);
        }
    };

    public getUserFeed = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const { postId } = request.params;
            const post = await Model.Post.findOne({
                where: {
                    _id: postId,
                },
                include: [
                    {
                        model: Model.User,
                        as: 'creator',
                        attributes: {
                            exclude: [
                                'password',
                                'salt',
                                'createdAt',
                                'updatedAt',
                            ],
                        },
                    },
                    {
                        model: Model.HashTag,
                        as: 'hashtags',
                    },
                ],
            });
            response.status(200).json({
                status: 'success',
                message: 'User post information',
                post,
            });
        } catch (error) {
            next(error);
        }
    };

    public getPostByHashTag = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const { hashTag } = request.params;
            const posts = await Model.HashTag.findOne({
                where: {
                    _id: hashTag,
                },
                include: [
                    {
                        model: Model.Post,
                        as: 'posts',
                    },
                ],
            });
            response.status(200).json({
                status: 'success',
                message: 'Post tagged with hashtag',
                hashTag: posts,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new Feeds();
