// User model--------------------
// How the interface will looks like......................

import mongoose from "mongoose";


import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";


const { Schema, model } = mongoose;
const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be atleast 5 character'],
        maxLength: [50, "Name Should be less than 50 Characters"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is Must be Required"],
        unique: true,
        lowercase: true,
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please Fill the Valid Email"

        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        select: false
    },

    avatar:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },
    role:
    {
        type:"String",
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},
   
    {
        timestamps:true
    });


    
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

        // We will Create generic MEthod with Schema...... So with we will Generate token And We will Save This Token for signin........

        userSchema.methods={
            generateJWTToken: async function(){
                return await Jwt.sign(
                    {
                    id:this.id,email:this.email,
                    subscription:this.subscription,role:this.role,
                },
                   
                        process.env.JWT_SECRET,{
                            expiresIn:process.env.JWT_EXPIRY

                    }

                 )
            },
            comparePassword:async function(plainTextPassword){
                return await bcrypt.compare(plainTextPassword,this.password)

            }

        }




// I have created the schema and than transfeerred into model so that it will used by anyone........

const User = model('User', userSchema);

export default User