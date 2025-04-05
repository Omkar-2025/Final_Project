"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
/**
 *  This route is used to get all the support queries
 */
router.route('/getAllSupport').get(admin_controller_1.AdminController.getAllSupport);
/**
 * This route is used to get all the users
 */
router.route('/getAllUsers').get(admin_controller_1.AdminController.getAllUsers);
/**
 * This route is used to get all the accounts
 */
router.route('/getAllAccounts').get(admin_controller_1.AdminController.getAllAccounts);
/**
 * This route is used to get all the support queries by id
 */
router.route('/getSupportById/:id').get(admin_controller_1.AdminController.getQueryById);
/**
 * This route is used to get all the users by id
 */
router.route('/getAccountByUserId/:id').get(admin_controller_1.AdminController.getAccountByUserId);
/**
 * This route is used to verify the account by id
 */
router.route('/verifyAccount/:id').put(admin_controller_1.AdminController.verifyAccount);
/**
 * This route is used to resolve the support query by id
 */
router.route('/resolveQuery/:id').put(admin_controller_1.AdminController.resolveSupport);
exports.default = router;
