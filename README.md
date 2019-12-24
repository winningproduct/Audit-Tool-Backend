# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

# API Documentation


/organizations/  
  
/products/  
/products/:id  
/products/:id/phases  
  
get latest knowledge areas
`/phases/:productPhaseId/knowledgeAreas`  
get latest questions of a knowledge area
`/phases/:productPhaseId/knowledgeAreas/:knowledgeAreaId/questions`  
  
get knowledge areas by revision
`/phases/:productPhaseId/revisions/:revisionId/knowledgeAreas`  
get questions of a knowledge area by revision
`/phases/:productPhaseId/revisions/:revisionId/knowledgeAreas/:knowledgeAreaId/questions`  
  
/questions/:questionId/evidence  
  
/audits  
