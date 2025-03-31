import express from 'express';
import { verifyJwt } from '../middlewares/verifyJwt';
import billsController from '../controllers/bills.controller';

const router = express.Router();


router.route('/createbill').post(verifyJwt, billsController.createBill);
router.route('/getbills/').get(verifyJwt, billsController.getBill);
router.route('/processbills').get(verifyJwt, billsController.ProcessBills);
router.route('/getbill/:id').get(verifyJwt, billsController.getBillById);
router.route('/paybills').post(verifyJwt, billsController.payBills);
router.route('/getbillsTranscation').get(verifyJwt, billsController.getBillshistoy);
router.route('/updateBill').put(verifyJwt, billsController.updateBill);
router.route('/deleteBill').delete(verifyJwt, billsController.deleteBill);


export default router;