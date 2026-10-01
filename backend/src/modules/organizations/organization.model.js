import mongoose from 'mongoose';
const schema=new mongoose.Schema({tenantId:{type:mongoose.Schema.Types.ObjectId,ref:'Tenant',required:true,index:true},name:{type:String,required:true},type:{type:String,enum:['CLINIC','COUNSELING_CENTER','NGO','EMPLOYER','SCHOOL','COMMUNITY_PROGRAM','HEALTHCARE_PARTNER'],required:true},status:{type:String,enum:['ACTIVE','SUSPENDED','ARCHIVED'],default:'ACTIVE'},settings:{type:mongoose.Schema.Types.Mixed,default:{}}},{timestamps:true});
schema.index({tenantId:1,name:1},{unique:true});
schema.add({createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}});
export default mongoose.model('Organization',schema);