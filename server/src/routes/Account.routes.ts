import express from 'express'
import AccountController from '../controllers/account.controller';
import { verifyJwt } from '../middlewares/verifyJwt';

const router= express.Router(); 


router.route('/createAccount').post(verifyJwt,AccountController.createBankAccount);
router.route('/getAccount/:id').get(verifyJwt,AccountController.getAccount);
router.route('/createTransaction').post(verifyJwt,AccountController.createTransaction);
router.route('/getTransactions/:id').get(AccountController.getTransactions);
router.route('/getTransactions/:id').get(AccountController.getTransactionsById);
router.route('/deposit').post(verifyJwt,AccountController.deposit);
router.route('/withdraw').post(verifyJwt,AccountController.withdraw);
router.route('/allAccounts').get(verifyJwt,AccountController.getAllAccounts);
router.route('/getMonthExpense/:id').get(verifyJwt,AccountController.getMonthlyExpenses);
router.route('/getMonthlyTranscations/:id').get(verifyJwt,AccountController.getMonthlyTranscations);
router.route('/getMonthlyAllExpenses').post(verifyJwt,AccountController.getMonthlyAllExpenses);



export default router;