import express from 'express'

import { AdminController } from '../controllers/admin.controller'
const router = express.Router() 


router.route('/login').post(AdminController.login)


router.route('/getAllSupport').get(AdminController.getAllSupport)
router.route('/getAllUsers').get(AdminController.getAllUsers)
router.route('/getAllAccounts').get(AdminController.getAllAccounts)
router.route('/getSupportById/:id').get(AdminController.getQueryById)
router.route('/getAccountByUserId/:id').get(AdminController.getAccountByUserId)
router.route('/verifyAccount/:id').put(AdminController.verifyAccount)
router.route('/resolveQuery/:id').put(AdminController.resolveSupport)



export default router;