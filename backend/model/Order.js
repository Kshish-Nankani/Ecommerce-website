const { timeStamp } = require("console")
const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    // take the user id from user table 
   user:{type:mongoose.Schema.Types.ObjectId , ref: 'User' , required:false},
    products:[
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
            qut:{type: Number , required:true, min: 1},
            price:{ type:Number , required:true }
        }
    ],
  totalAmount:{type:Number , required:true},
  address:{
    fullName:{type: String , required:true},
    street:{type:String , required:true},
    city:{ type:String , required: true},
    postalCode:{type:String, required:true},
    country:{ type:String , required:true}

  },
  paymentId:{type:String },
  status:{type:String, enum:['pending' , 'shipped' , 'delievered'], default: 'pending'}
},{timeStamps: true})


module.exports= mongoose.model('Order', orderSchema)