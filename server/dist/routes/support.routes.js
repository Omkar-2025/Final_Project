"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const support_controller_1 = __importDefault(require("../controllers/support.controller"));
const router = express_1.default.Router();
router.route('/query').post(support_controller_1.default.createSupport);
router.route('/query/all').get(support_controller_1.default.getAllSupport);
router.route('/query/:id').get(support_controller_1.default.getSupportById);
router.route('/query/:id').delete(support_controller_1.default.deleteSupport);
exports.default = router;
