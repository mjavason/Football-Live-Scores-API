import { Router } from 'express';
const router = Router();
import { matchValidation } from '../../../validation'; // Import your matchValidation schemas
import {
  processRequestBody,
  processRequestParams,
  processRequestQuery,
} from 'zod-express-middleware';
import { matchController } from '../../../controllers'; // Replace with your match controller

// Create a route for creating a new match
router.post('/', processRequestBody(matchValidation.create.body), matchController.create);

// Create a route for updating an existing match
router.patch(
  '/:id',
  [
    processRequestParams(matchValidation.update.params),
    processRequestBody(matchValidation.update.body),
  ],
  matchController.update,
);

// Create a route for deleting a match
router.delete(
  '/delete/:id',
  processRequestParams(matchValidation.delete.params),
  matchController.delete,
);

// Create a route for retrieving matches with specific criteria
router.get('/search', processRequestQuery(matchValidation.find.query), matchController.find);

// Create a route for searching home team fouls
router.get(
  '/search-home-team-fouls',
  processRequestQuery(matchValidation.searchHomeTeamFouls.query),
  matchController.findHomeTeamFouls,
);

// Create a route for searching away team fouls
router.get(
  '/search-away-team-fouls',
  processRequestQuery(matchValidation.searchAwayTeamFouls.query),
  matchController.findAwayTeamFouls,
);

// Create a route for searching home team goals
router.get(
  '/search-home-team-goals',
  processRequestQuery(matchValidation.searchHomeTeamGoals.query),
  matchController.findHomeTeamGoals,
);

// Create a route for searching away team goals
router.get(
  '/search-away-team-goals',
  processRequestQuery(matchValidation.searchAwayTeamGoals.query),
  matchController.findAwayTeamGoals,
);

export default router;
