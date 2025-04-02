"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
router.route('/login').post(admin_controller_1.AdminController.login);
router.route('/getAllSupport').get(admin_controller_1.AdminController.getAllSupport);
router.route('/getAllUsers').get(admin_controller_1.AdminController.getAllUsers);
router.route('/getAllAccounts').get(admin_controller_1.AdminController.getAllAccounts);
router.route('/getSupportById/:id').get(admin_controller_1.AdminController.getQueryById);
router.route('/getAccountByUserId/:id').get(admin_controller_1.AdminController.getAccountByUserId);
router.route('/verifyAccount/:id').put(admin_controller_1.AdminController.verifyAccount);
router.route('/resolveQuery/:id').put(admin_controller_1.AdminController.resolveSupport);
exports.default = router;
