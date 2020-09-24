import UserModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import { createToken } from '../helpers/jwt'

class AuthController {  
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} User object 
   */
  static async signup(req, res) {
    try {
      var user = await UserModel.findOne({ email: req.body.email }).exec();
      if(user) {
          return res.status(409).send(
            { 
              status: 409,
              message: 'Email already in use',
            }
          );
      }
      req.body.password = await bcrypt.hashSync(req.body.password, 10);
      const data = new UserModel(req.body);
      await data.save();
      return res.status(201).send({
        status: 201,
        message: 'User successfully added',
        data
    });
    } catch(error) {
      return res.status(400).send(
        {
          status: 400,
          message: 'Oops failed to signup',
          error
      });
    }
  }

  /**
   * Login A User
   * @param {object} req 
   * @param {object} res 
   * @returns {object} User object
   */
  static async login(req, res) {
    try {
      var user = await UserModel.findOne({ email: req.body.email }).exec();
      if(!user) {
          return res.status(400).send(
            { 
              status: 400,
              message: 'The email does not exist',
              error 
            }
          );
      }
      if(! await bcrypt.compare(req.body.password, user.password)) {
          return res.status(401).send(
            { 
              status: 401,
              message: 'The password is incorrect' 
            }
          );
      }
      req.body.role = user.role;
      const token = await createToken(req.body);
      res.send(
        { 
          status: 200,
          message: 'Logged in successfully',
          data: token 
        }
      );
    } catch (error) {
        return res.status(400).send(
          { 
            status: 400,
            message: 'Oops failed to log in user!',
            error
          });
    }
  }

}

export default AuthController;