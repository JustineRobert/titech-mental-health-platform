import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},status:{type:String,enum:['ACTIVE','SUSPENDED','ARCHIVED'],default:'ACTIVE'},settings:{type:mongoose.Schema.Types.Mixed,default:{}}},{timestamps:true});
export default mongoose.model('Tenant',schema);