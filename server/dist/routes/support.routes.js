"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const support_controller_1 = __importDefault(require("../controllers/support.controller"));
const router = express_1.default.Router();
/**
 * This route is used to create a new support query
 */
router.route('/query').post(support_controller_1.default.createSupport);
/**
 * This route is used to get all support queries
 */
router.route('/query/all').get(support_controller_1.default.getAllSupport);
/**
 * This route is used to get a support query by id
 */
router.route('/query/:id').get(support_controller_1.default.getSupportById);
/**
 * This route is used to update a support query by id
 */
router.route('/query/:id').delete(support_controller_1.default.deleteSupport);
exports.default = router;
