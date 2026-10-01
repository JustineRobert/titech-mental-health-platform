import crypto from 'node:crypto';
import AuditEvent from './auditEvent.model.js';

function canonical(value) { return JSON.stringify(value, Object.keys(value).sort()); }

export async function recordAudit({ tenantId, actorId, action, resourceType, resourceId, correlationId, outcome='SUCCESS', metadata={} }) {
  const previous = await AuditEvent.findOne({ tenantId }).sort({ timestamp:-1, _id:-1 }).select({ hash:1 }).lean();
  const previousHash = previous?.hash || 'GENESIS';
  const payload = { tenantId: String(tenantId || ''), actorId: String(actorId || ''), action, resourceType, resourceId:String(resourceId || ''), correlationId, outcome, metadata, previousHash, timestamp:new Date().toISOString() };
  const hash = crypto.createHash('sha256').update(canonical(payload)).digest('hex');
  return AuditEvent.create({ ...payload, timestamp:new Date(), previousHash, hash });
}
