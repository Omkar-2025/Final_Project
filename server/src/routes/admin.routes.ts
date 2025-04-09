import express from 'express'

import { AdminController } from '../controllers/admin.controller'
const router = express.Router() 



/**
 *  This route is used to get all the support queries
 */

router.route('/getAllSupport').get(AdminController.getAllSupport)

/**
 * This route is used to get all the users
 */

router.route('/getAllUsers').get(AdminController.getAllUsers)

/**
 * This route is used to get all the accounts
 */

router.route('/getAllAccounts').get(AdminController.getAllAccounts)

/**
 * This route is used to get all the support queries by id
 */

router.route('/getSupportById/:id').get(AdminController.getQueryById)

/**
 * This route is used to get all the users by id
 */

router.route('/getAccountByUserId/:id').get(AdminController.getAccountByUserId)

/**
 * This route is used to verify the account by id
 */

router.route('/verifyAccount/:id').put(AdminController.verifyAccount)

/**
 * This route is used to resolve the support query by id
 */

router.route('/resolveQuery/:id').put(AdminController.resolveSupport)


/**
 * 
 */

router.route('/getAllExpenses').get(AdminController.getAllExpenses);


export default router;