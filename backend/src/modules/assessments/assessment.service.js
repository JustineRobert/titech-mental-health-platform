import AssessmentTemplate from './assessmentTemplate.model.js';
import AssessmentSession from './assessmentSession.model.js';
import { AppError } from '../../shared/errors/AppError.js';

export function calculateScore(template,responses){
  const rules=template.scoringRules||{}; let score=0;
  for(const [key,rule] of Object.entries(rules)){const value=responses[key]; if(value===undefined)continue; if(typeof rule?.[String(value)]==='number')score+=rule[String(value)]; else if(typeof rule?.default==='number')score+=rule.default;}
  return score;
}

export async function startSession({tenantId,clientId,templateId}){
  const template=await AssessmentTemplate.findOne({_id:templateId,tenantId,status:'PUBLISHED'}).lean(); if(!template) throw new AppError('Published assessment template not found.',{statusCode:404,code:'NOT_FOUND'});
  return AssessmentSession.create({tenantId,clientId,templateId,templateVersion:template.version,status:'IN_PROGRESS'});
}
export async function completeSession({tenantId,sessionId,responses,userId}){
  const session=await AssessmentSession.findOne({_id:sessionId,tenantId}); if(!session)throw new AppError('Assessment session not found.',{statusCode:404,code:'NOT_FOUND'});
  if(session.status!=='IN_PROGRESS')throw new AppError('Assessment session is not open.',{statusCode:409,code:'CONFLICT'});
  const template=await AssessmentTemplate.findOne({_id:session.templateId,tenantId}).lean(); if(!template)throw new AppError('Assessment template missing.',{statusCode:500});
  session.responses=responses; session.score=calculateScore(template,responses); session.completedAt=new Date(); session.status='COMPLETED'; session.interpretationMetadata={requiresProfessionalReview:true,diagnosisNotProvided:true}; await session.save();
  return session;
}
