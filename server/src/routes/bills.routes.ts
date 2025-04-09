import express from 'express';
import { verifyJwt } from '../middlewares/verifyJwt';
import billsController from '../controllers/bills.controller';

const router = express.Router();


/**
 * This route is used to create a new bill
 */

router.route('/createbill').post(billsController.createBill);

/**
 * This route is used to get all bills of a user
 */

router.route('/getbills').get(billsController.getBill);

/**
 *  This route is used to process the bills of a user
 */

router.route('/processbills').get(billsController.ProcessBills);

/**
 * This route is used to get a bill by id
 */

router.route('/getbill/:id').get( billsController.getBillById);

/**
 * This route is used to pay a bill
 */

router.route('/paybills').post(billsController.payBills);

/**
 * This route is used to get the bills history of a user
 */

router.route('/getbillsTranscation').post(billsController.getBillshistoy);

/**
 * This route is used to get the bills history of a user by id
 */

router.route('/updateBill').put( billsController.updateBill);

/**
 * This route is used to delete a bill
 */

router.route('/deleteBill').delete(billsController.deleteBill);


export default router;