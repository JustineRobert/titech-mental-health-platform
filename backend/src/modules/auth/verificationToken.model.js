import mongoose from 'mongoose';
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},tokenHash:{type:String,required:true,unique:true},purpose:{type:String,enum:['EMAIL_VERIFY','PASSWORD_RESET'],required:true},expiresAt:{type:Date,required:true,index:true},usedAt:Date},{timestamps:true});
export default mongoose.model('VerificationToken',schema);