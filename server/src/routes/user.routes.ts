import express from 'express';
import userController from '../controllers/user.controller';
import { User } from '../entitiy/User.entity';
import { verifyJwt } from '../middlewares/verifyJwt';
const router = express.Router();


router.route('/createuser').post(userController.createUser);
router.route('/login').post(userController.Login);
router.route('/getAllAccounts').get(verifyJwt,userController.getAllAccounts);
router.route('/verifyUser').post(userController.verifyUser);
router.route('/logout').get(userController.logout)
router.route('/getUser').get(verifyJwt,userController.getUser);
router.route('/updateUser').post(verifyJwt,userController.updateUser);
router.route('/updatePassword').post(verifyJwt,userController.updatePassword);


export default router;
