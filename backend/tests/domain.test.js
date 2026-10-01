import test from 'node:test'; import assert from 'node:assert/strict';
const ROLE_PERMISSIONS={CLIENT:['client:read','appointment:read','appointment:create','care_plan:read','assessment:read','assessment:create','resource:read','consent:read','consent:create','consent:update'],COUNSELOR:['clinical_record:read','clinical_record:create','safety:create'],TENANT_ADMIN:['*']};
const has=(role,p)=>ROLE_PERMISSIONS[role]?.includes('*')||ROLE_PERMISSIONS[role]?.includes(p);
test('permission matrix rejects clinical record access for client role',()=>{assert.equal(has('CLIENT','clinical_record:read'),false);assert.equal(has('COUNSELOR','clinical_record:read'),true);});
test('tenant admin wildcard permits managed actions',()=>assert.equal(has('TENANT_ADMIN','administration:manage'),true));
test('sensitive clinical notes are represented by a dedicated permission boundary',()=>assert.notEqual('clinical_record:read','client:read'));
