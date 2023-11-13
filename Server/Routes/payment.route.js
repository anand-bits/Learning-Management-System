import {Router} from 'express'
import { allPayment, buySubscription, cancelSubscription, getRazorPayAPIKey, verifySubscription } from '../controller/payment.controller.js';
import { authorizedRoles, isLoggedIn } from '../middleware/auth.middleware.js';
const router= Router();

router.route('/razorpay-key').get(isLoggedIn,getRazorPayAPIKey);

router.route('/subscribe').post(isLoggedIn,buySubscription);
router.route('/verify').post(isLoggedIn,verifySubscription);

router.route('/unsubscribe').post(isLoggedIn,cancelSubscription);

router.route('/').get(isLoggedIn,authorizedRoles('ADMIN'),allPayment);


export default router
