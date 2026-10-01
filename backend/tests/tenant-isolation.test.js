import test from 'node:test'; import assert from 'node:assert/strict';
function tenantFilter(tenantId,filter={}){return {_tenantSentinel:tenantId,tenantId,...filter};}
test('tenant-aware repositories always include tenantId',()=>assert.equal(tenantFilter('A',{clientId:'1'}).tenantId,'A'));
