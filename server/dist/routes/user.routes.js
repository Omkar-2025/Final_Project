"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const verifyJwt_1 = require("../middlewares/verifyJwt");
const router = express_1.default.Router();
router.route('/createuser').post(user_controller_1.default.createUser);
router.route('/login').post(user_controller_1.default.Login);
router.route('/getAllAccounts').get(verifyJwt_1.verifyJwt, user_controller_1.default.getAllAccounts);
router.route('/verifyUser').post(user_controller_1.default.verifyUser);
router.route('/logout').get(user_controller_1.default.logout);
router.route('/getUser').get(verifyJwt_1.verifyJwt, user_controller_1.default.getUser);
router.route('/updateUser').post(verifyJwt_1.verifyJwt, user_controller_1.default.updateUser);
router.route('/updatePassword').post(verifyJwt_1.verifyJwt, user_controller_1.default.updatePassword);
exports.default = router;
