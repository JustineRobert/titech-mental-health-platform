import mongoose from 'mongoose';
const schema=new mongoose.Schema({tenantId:{type:mongoose.Schema.Types.ObjectId,ref:'Tenant',required:true,index:true},organizationId:{type:mongoose.Schema.Types.ObjectId,ref:'Organization',required:true,index:true},userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},role:{type:String,required:true},permissions:{type:[String],default:[]},status:{type:String,enum:['ACTIVE','SUSPENDED','REMOVED'],default:'ACTIVE'}},{timestamps:true});
schema.index({tenantId:1,organizationId:1,userId:1},{unique:true});
schema.add({createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}});
export default mongoose.model('OrganizationMembership',schema);