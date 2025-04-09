import express from 'express'
import AccountController from '../controllers/account.controller';
import { verifyJwt } from '../middlewares/verifyJwt';

const router= express.Router(); 

/**
 * This route is used to create a new bank account
 */

router.route('/createAccount').post(AccountController.createBankAccount);

/**
 * This route is used to get the bank account of the user
 */

router.route('/getAccount/:id').get(AccountController.getAccount);

/**
 * This route is used to create a transaction
 */

router.route('/createTransaction').post(AccountController.createTransaction);

/**
 * This route is used to get the transactions of the userid
 */

router.route('/getTransactions/:id').post(AccountController.getTransactions);

/**
 * This route is used to get the transactions of the transcation by id
 */

router.route('/getTransactions/:id').get(AccountController.getTransactionsById);

/**
 * This route is used to get the transactions of the user by id
 */

router.route('/deposit').post(AccountController.deposit);

/**
 * This route is used to withdraw the amount from the account
 */

router.route('/withdraw').post(AccountController.withdraw);

/**
 * This route is used to get all the bank accounts of the user
 */

router.route('/allAccounts').get(AccountController.getAllAccounts);

/**
 * This route is used to get all the Monthly expenses of the user
 */

router.route('/getMonthExpense/:id').get(AccountController.getMonthlyExpenses);

/**
 * This route is used to get the all the monthly transactions of the user
 */

router.route('/getMonthlyTranscations/:id').get(AccountController.getMonthlyTranscations);

/**
 * This route is used to get the all the monthly transactions of the user
 */

router.route('/getMonthlyAllExpenses').post(AccountController.getMonthlyAllExpenses);

/**
 * This route is used to get the expense pdf of the user
 */

router.route('/getExpensepdf').get(AccountController.getExpensePdf);


/**
 * This route is used to deactivate the account of the user
 */

router.route('/deactivateAccount').post(AccountController.deactiveAccount);


/**
 *  This route is used to activate the account of the user
 */

router.route('/activateAccount').post(AccountController.activateAccount);


/**
 * This route is used to find the transcation through the transcation type
 */


router.route('/searchTranscation').post(AccountController.searchTransaction);


export default router;