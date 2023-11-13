import User from "../models/user.models.js";
import { razorpay } from "../server.js";
import AppError from "../utils/error.utils.js";

const  getRazorPayAPIKey=async (req,res,next)=>
{
    res.status(200).json({
        success:true,
        message:"RazorPay Key",
        key:process.env.RAZOR_KEY_ID
    });

}
const buySubscription=async (req,res,next)=>
{
    const{id}=req.user;

    const user=await User.findById(id);
    if(!user)
    {
        return next(new AppError("User Dont exit first create Account"),400)

    }
    if(user.role==='ADMIN')
    {
        return next(new AppError("Admin cant purchase subscription"),400);

    }
    //Generate the subscription so that u can buy the subscription............>>>>>

    const subscription= await razorpay.subscriptions.create(
        {
            plan_id:process.env.RAZORPAY_PLAN_ID,
            customer_notify:1
        }
    );

    user.subscription.id=subscription.id;
    user.subscription.status= subscription.status;
    await user.save()
    res.status(200).json({
        success:true,
        message:"Subscription Successfully",
        subscription_id:subscription.id
    });




}
const  verifySubscription=async(req,res,next)=>
{
    const {id}=req.user;
    const{razorpay_payment_id,razorpay_signature,razorpay_subscription_id}=req.body;
// Generally we are getting the subscription id from user  body and we are requesting id from body , verification is done when user created the subscription id so req will contain
// payment id, signataturem and subscription id..


    const user= await User.findById(id);
    if(!user)
    {
        return next(new AppError("User Dont exit first register"),400);

    }
    // We taken the subscripton id from user and we Generate the razorpay signature and that signature will be matched with the user signature id if matched
    // than marks the status of user as Active and if not than throw the error ...

    const subscriptionID= user.subscription.id;

    const generatedSignature= crypto.createHmac('sha256',process.env.RAZORPAY_SECRET).update(`${razorpay_payment_id}|${subscriptionID}`)
    .digest('hex');

    if(generatedSignature!= razorpay_signature)
    {
        return next(new AppError('Payment not verified,please try again'),400)

    }
// If both match then Create the payment schema.

    await Payment.create(
        {
            razorpay_payment_id,razorpay_signature,razorpay_subscription_id
        }
    );
// saved the user status as active and we are sending back to the mongodb

    user.subscription.status="active";
    await user.save();
    res.status(200).json({
        success:true,
        message:"Payment created Successfully",
        user
    })





}
const  cancelSubscription=(req,res,next)=>
{
    
}

const allPayment=async(req,res,next)=>
{

}
export {
    getRazorPayAPIKey,buySubscription,verifySubscription,cancelSubscription,allPayment
}