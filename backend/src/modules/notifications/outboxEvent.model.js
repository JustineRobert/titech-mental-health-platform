import mongoose from 'mongoose';
const schema=new mongoose.Schema({tenantId:{type:mongoose.Schema.Types.ObjectId,ref:'Tenant',required:true,index:true},eventType:{type:String,required:true},aggregateType:{type:String,required:true},aggregateId:{type:String,required:true},payload:{type:mongoose.Schema.Types.Mixed,default:{}},status:{type:String,enum:['PENDING','PROCESSING','PROCESSED','FAILED'],default:'PENDING'},attempts:{type:Number,default:0},processedAt:Date,lastError:String},{timestamps:true});
schema.index({tenantId:1,status:1,createdAt:1});
schema.index({eventType:1,aggregateType:1,aggregateId:1});
schema.add({createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}});
export default mongoose.model('OutboxEvent',schema);
