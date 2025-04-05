import express from 'express';
import supportController from '../controllers/support.controller';

const router = express.Router();


/**
 * This route is used to create a new support query
 */

router.route('/query').post(supportController.createSupport);

/**
 * This route is used to get all support queries
 */

router.route('/query/all').get(supportController.getAllSupport);

/**
 * This route is used to get a support query by id
 */

router.route('/query/:id').get(supportController.getSupportById);

/**
 * This route is used to update a support query by id
 */

router.route('/query/:id').delete(supportController.deleteSupport);



export default router;