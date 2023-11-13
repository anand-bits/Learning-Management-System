import User from "../models/user.models.js";
import { razorpay } from "../server.js";
import AppError from "../utils/error.utils.js";
import crypto from "crypto"; // Import crypto for signature generation

const getRazorPayAPIKey = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "RazorPay Key",
            key: process.env.RAZOR_KEY_ID,
            
        });
    } catch (error) {
        return next(new AppError(error.message),400); // Pass the error to the error handling middleware
    }
};

const buySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("User doesn't exist; first create an account"), 400);
        }

        if (user.role === 'ADMIN') {
            return next(new AppError("Admins can't purchase subscriptions"), 400);
        }

        // Generate the subscription so that you can buy the subscription
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
        });

        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Subscription Successful",
            subscription_id: subscription.id,
        });
    } catch (error) {
        next(error);
    }
};

const verifySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return next(new AppError("User doesn't exist; first register"), 400);
        }

        const subscriptionID = user.subscription.id;

        // Generate the razorpay signature and match it with the user's signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionID}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return next(new AppError('Payment not verified, please try again'), 400);
        }

        // If both match, create the payment schema
        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id,
        });

        // Save the user status as active and send it back to MongoDB
        user.subscription.status = "active";
        await user.save();

        res.status(200).json({
            success: true,
            message: "Payment created Successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("User doesn't exist; first create an account"), 400);
        }

        if (user.role === 'ADMIN') {
            return next(new AppError("Admins can't purchase subscriptions"), 400);
        }

        const subscription_id = user.subscription.id;
        const subscription = await razorpay.subscriptions.cancel(subscription_id);

        user.subscription.status = subscription.status;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Subscription canceled successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

const allPayment = async (req, res, next) => {
    try {
        // Add logic for fetching all paymentsy

        const {count}= req.query;
        const payments= await razorpay.subscriptions.all({
            count:10||count
        });

        res.status(200).json({
            success:true,
            message:"All Payments",
            subscriptions
        })


    } catch (error) {
        next(error);
    }
};

export {
    getRazorPayAPIKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayment,
};
