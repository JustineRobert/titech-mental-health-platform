export class TenantRepository {
  constructor(Model) { this.Model = Model; }
  find(tenantId, filter = {}) { return this.Model.find({ tenantId, ...filter }); }
  findOne(tenantId, filter = {}) { return this.Model.findOne({ tenantId, ...filter }); }
  findById(tenantId, id) { return this.Model.findOne({ _id: id, tenantId }); }
  create(tenantId, actorId, data) { return this.Model.create({ ...data, tenantId, createdBy: actorId, updatedBy: actorId }); }
  updateById(tenantId, id, actorId, data) { return this.Model.findOneAndUpdate({ _id:id, tenantId }, { ...data, updatedBy:actorId }, { new:true, runValidators:true }); }
}
