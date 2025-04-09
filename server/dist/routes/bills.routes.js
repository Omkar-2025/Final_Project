"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bills_controller_1 = __importDefault(require("../controllers/bills.controller"));
const router = express_1.default.Router();
/**
 * This route is used to create a new bill
 */
router.route('/createbill').post(bills_controller_1.default.createBill);
/**
 * This route is used to get all bills of a user
 */
router.route('/getbills').get(bills_controller_1.default.getBill);
/**
 *  This route is used to process the bills of a user
 */
router.route('/processbills').get(bills_controller_1.default.ProcessBills);
/**
 * This route is used to get a bill by id
 */
router.route('/getbill/:id').get(bills_controller_1.default.getBillById);
/**
 * This route is used to pay a bill
 */
router.route('/paybills').post(bills_controller_1.default.payBills);
/**
 * This route is used to get the bills history of a user
 */
router.route('/getbillsTranscation').post(bills_controller_1.default.getBillshistoy);
/**
 * This route is used to get the bills history of a user by id
 */
router.route('/updateBill').put(bills_controller_1.default.updateBill);
/**
 * This route is used to delete a bill
 */
router.route('/deleteBill').delete(bills_controller_1.default.deleteBill);
exports.default = router;
