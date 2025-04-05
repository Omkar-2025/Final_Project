import express from 'express';
import userController from '../controllers/user.controller';
import { User } from '../entitiy/User.entity';
import { verifyJwt } from '../middlewares/verifyJwt';
const router = express.Router();


/**
 * This route is used to create a new user
 */

router.route('/createuser').post(userController.createUser);

/**
 * This route is used to login a user
 */

router.route('/login').post(userController.Login);

/**
 * This route is used to get all accounts of a user
 */

router.route('/getAllAccounts').get(verifyJwt,userController.getAllAccounts);

/**
 * This route is used verify the user by otp
 */

router.route('/verifyUser').post(userController.verifyUser);


/**
 * This route is used to logout the user
 */

router.route('/logout').get(userController.logout)

/**
 * This route is used to get the user details
 */

router.route('/getUser').get(verifyJwt,userController.getUser);


/**
 * This route is used to update the user details
 */

router.route('/updateUser').post(verifyJwt,userController.updateUser);


/**
 * This route is used to update the user password
 */

router.route('/updatePassword').post(verifyJwt,userController.updatePassword);


export default router;
