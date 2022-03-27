import { Request, Response, NextFunction } from 'express';
import Model from '../../../app/models/model';
import authService from '../../service/v1/auth.service';
import APIError from '../../exceptions/APIError';
import AuthorizationError from '../../exceptions/AuthorizationError';

class Login {
  public userSignUp = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { userName, password } = request.body;
      let user = await Model.User.findOne({
        where: { userName },
      });
      if (user) {
        throw new APIError('User already registered', 400);
      }
      const { hash, salt } = await authService.encryptKey(password);
      user = await Model.User.create({
        userName,
        password: hash,
        salt,
      });
      response.status(200).json({
        status: 'success',
        message: 'user signup success',
        user: user,
      });
    } catch (error) {
      next(error);
    }
  };

  public userLogin = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { userName, password } = request.body;
      let userInstance = await Model.User.findOne({
        where: { userName },
      });
      if (!userInstance) {
        throw new APIError('Invalid userName', 400);
      }
      const user = userInstance.toJSON();
      const hasedPass = await authService.decryptKey(password, user.salt);
      if (hasedPass !== user.password) {
        throw new AuthorizationError('Invalid password provided', 401);
      }
      const token = authService.generateToken({ _id: user._id });
      response.status(200).json({
        status: 'success',
        message: 'User login successful',
        user: user,
        accessToken: token,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new Login();
