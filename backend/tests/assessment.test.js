import test from 'node:test'; import assert from 'node:assert/strict';
function score(template,responses){let total=0;for(const [k,r] of Object.entries(template.scoringRules||{})){const v=responses[k];if(v!==undefined&&typeof r[String(v)]==='number')total+=r[String(v)];}return total;}
test('assessment scoring is deterministic and version-rule driven',()=>{const t={version:'1.0',scoringRules:{a:{'0':0,'1':2},b:{yes:3}}};assert.equal(score(t,{a:'1',b:'yes'}),5);});
