import express from 'express';
import supportController from '../controllers/support.controller';

const router = express.Router();

router.route('/query').post(supportController.createSupport);
router.route('/query/all').get(supportController.getAllSupport);
router.route('/query/:id').get(supportController.getSupportById);
router.route('/query/:id').delete(supportController.deleteSupport);

export default router;