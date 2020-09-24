import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * 
 * @description  create a token
 * @param {object} req the request
 * @param {object} res the response
 * @param {next} next move to the middleware
 */

async function createToken(data) {
    const token = await jwt.sign({
        ...data
    }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 // expires in 1 hour
        });
    return token;
}
export { createToken };