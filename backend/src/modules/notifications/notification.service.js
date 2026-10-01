import Notification from './notification.model.js';
import OutboxEvent from './outboxEvent.model.js';
export async function enqueueNotification({tenantId,recipientUserId,channel,templateKey,payload={},idempotencyKey}){return Notification.create({tenantId,recipientUserId,channel,templateKey,payload,idempotencyKey});}

export async function enqueueDomainEvent({tenantId,eventType,aggregateType,aggregateId,payload={}}){return OutboxEvent.create({tenantId,eventType,aggregateType,aggregateId,payload});}
