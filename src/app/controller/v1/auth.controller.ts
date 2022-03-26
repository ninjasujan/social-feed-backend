import { Request, Response, NextFunction } from 'express';
import Model from '../../../app/models/model';
import authService from '../../service/v1/auth.service';
import APIError from '../../exceptions/APIError';

class Login {
  public userSignUp = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { userName, password } = request.body;
      let user = await Model.userModel.findOne({
        where: { userName },
      });
      if (user) {
        throw new APIError('User already registered', 400);
      }
      const { hash, salt } = await authService.encryptKey(password);
      user = await Model.userModel.create({
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
}

export default new Login();
