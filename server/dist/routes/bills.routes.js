"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyJwt_1 = require("../middlewares/verifyJwt");
const bills_controller_1 = __importDefault(require("../controllers/bills.controller"));
const router = express_1.default.Router();
router.route('/createbill').post(verifyJwt_1.verifyJwt, bills_controller_1.default.createBill);
router.route('/getbills/').get(verifyJwt_1.verifyJwt, bills_controller_1.default.getBill);
router.route('/processbills').get(verifyJwt_1.verifyJwt, bills_controller_1.default.ProcessBills);
router.route('/getbill/:id').get(verifyJwt_1.verifyJwt, bills_controller_1.default.getBillById);
router.route('/paybills').post(verifyJwt_1.verifyJwt, bills_controller_1.default.payBills);
router.route('/getbillsTranscation').get(verifyJwt_1.verifyJwt, bills_controller_1.default.getBillshistoy);
router.route('/updateBill').put(verifyJwt_1.verifyJwt, bills_controller_1.default.updateBill);
router.route('/deleteBill').delete(verifyJwt_1.verifyJwt, bills_controller_1.default.deleteBill);
exports.default = router;
