import express from 'express'

import { AdminController } from '../controllers/admin.controller'
import { verifyJwt } from '../middlewares/verifyJwt';
const router = express.Router() 
const app =express();

router.route('/login').post(AdminController.login)
app.use(verifyJwt)

router.route('/getAllSupport').get(AdminController.getAllSupport)
router.route('/verifyAccount/:id').put(AdminController.verifyAccount)
router.route('/resolveQuery/:id').put(AdminController.resolveSupport)



export default router;