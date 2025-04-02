"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = __importDefault(require("../controllers/account.controller"));
const verifyJwt_1 = require("../middlewares/verifyJwt");
const router = express_1.default.Router();
router.route('/createAccount').post(verifyJwt_1.verifyJwt, account_controller_1.default.createBankAccount);
router.route('/getAccount/:id').get(verifyJwt_1.verifyJwt, account_controller_1.default.getAccount);
router.route('/createTransaction').post(verifyJwt_1.verifyJwt, account_controller_1.default.createTransaction);
router.route('/getTransactions/:id').get(account_controller_1.default.getTransactions);
router.route('/getTransactions/:id').get(account_controller_1.default.getTransactionsById);
router.route('/deposit').post(verifyJwt_1.verifyJwt, account_controller_1.default.deposit);
router.route('/withdraw').post(verifyJwt_1.verifyJwt, account_controller_1.default.withdraw);
exports.default = router;
