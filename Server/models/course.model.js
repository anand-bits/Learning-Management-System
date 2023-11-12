import { Model,Schema } from "mongoose";

const courseSchema=new Schema({
    title:{

    },
    description:{

    },
    category:{

    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:
                {
                    type:String,
                },
                secure_url:{
                    tu
                }
            }
        }
    ]
    
})