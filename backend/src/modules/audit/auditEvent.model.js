import mongoose from 'mongoose';
const schema=new mongoose.Schema({tenantId:{type:mongoose.Schema.Types.ObjectId,index:true},actorId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},action:{type:String,required:true},resourceType:String,resourceId:String,timestamp:{type:Date,default:Date.now,index:true},correlationId:String,outcome:{type:String,enum:['SUCCESS','FAILURE'],required:true},metadata:{type:mongoose.Schema.Types.Mixed,default:{}},previousHash:String,hash:{type:String,required:true}},{versionKey:false,timestamps:false});
schema.index({tenantId:1,timestamp:-1});
schema.add({createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}});
export default mongoose.model('AuditEvent',schema);