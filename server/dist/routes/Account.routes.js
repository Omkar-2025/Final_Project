"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = __importDefault(require("../controllers/account.controller"));
const router = express_1.default.Router();
/**
 * This route is used to create a new bank account
 */
router.route('/createAccount').post(account_controller_1.default.createBankAccount);
/**
 * This route is used to get the bank account of the user
 */
router.route('/getAccount/:id').get(account_controller_1.default.getAccount);
/**
 * This route is used to create a transaction
 */
router.route('/createTransaction').post(account_controller_1.default.createTransaction);
/**
 * This route is used to get the transactions of the userid
 */
router.route('/getTransactions/:id').post(account_controller_1.default.getTransactions);
/**
 * This route is used to get the transactions of the transcation by id
 */
router.route('/getTransactions/:id').get(account_controller_1.default.getTransactionsById);
/**
 * This route is used to get the transactions of the user by id
 */
router.route('/deposit').post(account_controller_1.default.deposit);
/**
 * This route is used to withdraw the amount from the account
 */
router.route('/withdraw').post(account_controller_1.default.withdraw);
/**
 * This route is used to get all the bank accounts of the user
 */
router.route('/allAccounts').get(account_controller_1.default.getAllAccounts);
/**
 * This route is used to get all the Monthly expenses of the user
 */
router.route('/getMonthExpense/:id').get(account_controller_1.default.getMonthlyExpenses);
/**
 * This route is used to get the all the monthly transactions of the user
 */
router.route('/getMonthlyTranscations/:id').get(account_controller_1.default.getMonthlyTranscations);
/**
 * This route is used to get the all the monthly transactions of the user
 */
router.route('/getMonthlyAllExpenses').post(account_controller_1.default.getMonthlyAllExpenses);
/**
 * This route is used to get the expense pdf of the user
 */
router.route('/getExpensepdf').get(account_controller_1.default.getExpensePdf);
/**
 * This route is used to deactivate the account of the user
 */
router.route('/deactivateAccount').post(account_controller_1.default.deactiveAccount);
/**
 *  This route is used to activate the account of the user
 */
router.route('/activateAccount').post(account_controller_1.default.activateAccount);
exports.default = router;
