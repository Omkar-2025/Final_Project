"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const verifyJwt_1 = require("../middlewares/verifyJwt");
const router = express_1.default.Router();
/**
 * This route is used to create a new user
 */
router.route('/createuser').post(user_controller_1.default.createUser);
/**
 * This route is used to login a user
 */
router.route('/login').post(user_controller_1.default.Login);
/**
 * This route is used to get all accounts of a user
 */
router.route('/getAllAccounts').get(verifyJwt_1.verifyJwt, user_controller_1.default.getAllAccounts);
/**
 * This route is used verify the user by otp
 */
router.route('/verifyUser').post(user_controller_1.default.verifyUser);
/**
 * This route is used to logout the user
 */
router.route('/logout').get(user_controller_1.default.logout);
/**
 * This route is used to get the user details
 */
router.route('/getUser').get(verifyJwt_1.verifyJwt, user_controller_1.default.getUser);
/**
 * This route is used to update the user details
 */
router.route('/updateUser').post(verifyJwt_1.verifyJwt, user_controller_1.default.updateUser);
/**
 * This route is used to update the user password
 */
router.route('/updatePassword').post(verifyJwt_1.verifyJwt, user_controller_1.default.updatePassword);
/**
 * This route is used to forgetOtp
 */
router.route('/forgetOtp').post(user_controller_1.default.sendForgetPasswordOtp);
/**
 *
 */
router.route('/verifyForgetOtp').post(user_controller_1.default.verifyForgetPasswordOtp);
exports.default = router;
