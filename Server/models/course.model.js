import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true,"Title is Required"],
       minLength:[8,'Title must be Of 8 length'],
       maxLength:[50,'Title must be less than  %0 character'],
       trim:true
    },
    description: {
      type: String,
      required: [true,"Description Must be added"],
      minLength:[8,"Discription must be atleast 8 character"],
      maxLength:[200,"Description should be less than 200 word"]
    },
    category: {
      type: String,
      required: [true,"Category is Required"]
    },

    thumbnail:{
        public_id:{
         type:String,
        required:true
    },
        secure_url:{
            type:String,
            required:true,

        }
    },
    lectures: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
      },
    ],
    numbersOfLecture: {
      type: Number,
      required: true,
      default:0,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Course = model('Course', courseSchema);

export default model("Course", courseSchema);
