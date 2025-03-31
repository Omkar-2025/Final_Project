"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const verifyJwt_1 = require("../middlewares/verifyJwt");
const router = express_1.default.Router();
const app = (0, express_1.default)();
router.route('/login').post(admin_controller_1.AdminController.login);
app.use(verifyJwt_1.verifyJwt);
router.route('/getAllSupport').get(admin_controller_1.AdminController.getAllSupport);
router.route('/verifyAccount/:id').put(admin_controller_1.AdminController.verifyAccount);
router.route('/resolveQuery/:id').put(admin_controller_1.AdminController.resolveSupport);
exports.default = router;
