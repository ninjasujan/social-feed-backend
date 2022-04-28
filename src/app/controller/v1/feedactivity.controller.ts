import APIError from '@feed-exceptions/APIError';
import Model from '@feed-models/model';
import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';

class FeedActivity {
    public reactToPost = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const _id = Number(request.user._id);
            const { like } = request.body;
            const { postId } = request.params;
            const postInstance = await Model.Post.findByPk(postId);
            const post = postInstance?.toJSON();
            if (!post) {
                throw new APIError('Please provide valid post id', 400);
            }
            if (like) {
                const reaction = await Model.Likes.findOne({
                    where: { userId: _id, postId: post._id },
                });
                if (reaction) {
                    throw new APIError('You already reacted to this post', 400);
                }
                await Model.Likes.create({ userId: _id, postId: post._id });
            } else {
                await Model.Likes.destroy({
                    where: { postId: post._id, userId: _id },
                });
            }
            response.status(200).json({
                status: 'success',
                message: 'You reacted to the post',
            });
        } catch (error) {
            next(error);
        }
    };

    public getReactedUserList = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const { postId } = request.params;
            const postInstance = await Model.Post.findByPk(postId);
            const post = postInstance?.toJSON();
            if (!post) {
                throw new APIError('Please provide valid post id', 400);
            }
            const users = await Model.Post.findOne({
                where: { _id: post._id },
                include: {
                    model: Model.User,
                    as: 'likedUser',
                    attributes: {
                        exclude: [
                            'password',
                            'salt',
                            'createdAt',
                            'updatedAt',
                            'likes',
                        ],
                    },
                },
            });
            return response.status(200).json({
                status: 'success',
                message: 'User list',
                post: users,
            });
        } catch (error) {
            next(error);
        }
    };

    public commentPost = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const _id = Number(request.user._id);
            const { text, parentComment } = request.body;
            let { postId }: any = request.params;
            const postInstance = await Model.Post.findByPk(postId);
            const post = postInstance?.toJSON();
            if (!post) {
                throw new APIError('Please provide valid post id', 400);
            }
            if (parentComment) {
                const parentCommentInstance = await Model.Comment.findByPk(
                    parentComment,
                );
                const rootComment = parentCommentInstance?.toJSON();
                if (!rootComment) {
                    throw new APIError('You are comment reply is invalid', 400);
                }
            }
            await Model.Comment.create({
                parentComment,
                postId,
                userId: _id,
                text,
            });
            response.status(200).json({
                status: 'success',
                message: 'Your comment added successfully',
            });
        } catch (error) {
            next(error);
        }
    };

    public getCommentByPost = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const { postId } = request.params;
            const post = await Model.Post.findByPk(postId);
            if (!post) {
                throw new APIError('Inavlid post id', 400);
            }
            const comments = await Model.Comment.findAll({
                where: { postId, parentComment: { [Op.eq]: null } },
                limit: 10,
                offset: 0,
                include: [
                    {
                        model: Model.User,
                        attributes: ['userName', 'profileImage', '_id'],
                        as: 'user',
                    },
                ],
            });
            const commentList = [];
            for (let i = 0; i < comments.length; i++) {
                const comment = comments[i].toJSON();
                const replies = await Model.Comment.findAll({
                    where: { parentComment: comment._id },
                });
                commentList.push({ ...comment, replies });
            }
            response.status(200).json({
                status: 'success',
                message: 'Comment found.',
                comments: commentList,
            });
        } catch (error) {
            next(error);
        }
    };

    public testApiRoute = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const _id = Number(request.user._id);
            const comments = await Model.Post.findAll({
                include: [
                    {
                        model: Model.User,
                        as: 'postComments',
                        required: false,
                        attributes: ['_id', 'userName'],
                        through: {
                            as: 'comment',
                        },
                    },
                ],
            });
            response.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    };
}

export default new FeedActivity();
