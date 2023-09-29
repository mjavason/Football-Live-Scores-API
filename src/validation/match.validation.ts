import { z } from 'zod';
import { Types } from 'mongoose';

class Validation {
  // Validation schema for creating a new match
  create = {
    body: z.object({
      match_date: z.date().optional(),
      home_team: z.string().min(1).max(255).optional(),
      away_team: z.string().min(1).max(255).optional(),
      full_time_score: z
        .object({
          home_team_score: z.number().int().min(0).optional(),
          away_team_score: z.number().int().min(0).optional(),
        })
        .optional(),
      fouls: z
        .object({
          home_team_fouls: z
            .array(
              z.object({
                player_name: z.string().min(1).max(255).optional(),
                foul_type: z.enum(['freekick', 'yellow', 'red']).optional(),
              }),
            )
            .optional(),
          away_team_fouls: z
            .array(
              z.object({
                player_name: z.string().min(1).max(255).optional(),
                foul_type: z.enum(['freekick', 'yellow', 'red']).optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      goals: z
        .object({
          home_team: z
            .object({
              player_name: z.string().min(1).max(255).optional(),
              allowed: z.boolean().optional(),
              goal_type: z.enum(['freekick', 'penalty', 'open']).optional(),
            })
            .optional(),
          away_team: z
            .object({
              player_name: z.string().min(1).max(255).optional(),
              allowed: z.boolean().optional(),
              goal_type: z.enum(['freekick', 'penalty', 'open']).optional(),
            })
            .optional(),
        })
        .optional(),
      deleted: z.boolean().optional(),
    }),
  };

  // Validation schema for updating an existing match
  update = {
    params: z
      .object({
        id: z.string().min(1).max(255).refine((value) => Types.ObjectId.isValid(value), {
          message: 'Invalid ObjectId format',
        }),
      })
      .optional(),
    body: z.object({
      match_date: z.date().optional(),
      home_team: z.string().min(1).max(255).optional(),
      away_team: z.string().min(1).max(255).optional(),
      full_time_score: z
        .object({
          home_team_score: z.number().int().min(0).optional(),
          away_team_score: z.number().int().min(0).optional(),
        })
        .optional(),
      fouls: z
        .object({
          home_team_fouls: z
            .array(
              z.object({
                player_name: z.string().min(1).max(255).optional(),
                foul_type: z.enum(['freekick', 'yellow', 'red']).optional(),
              }),
            )
            .optional(),
          away_team_fouls: z
            .array(
              z.object({
                player_name: z.string().min(1).max(255).optional(),
                foul_type: z.enum(['freekick', 'yellow', 'red']).optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      goals: z
        .object({
          home_team: z
            .object({
              player_name: z.string().min(1).max(255).optional(),
              allowed: z.boolean().optional(),
              goal_type: z.enum(['freekick', 'penalty', 'open']).optional(),
            })
            .optional(),
          away_team: z
            .object({
              player_name: z.string().min(1).max(255).optional(),
              allowed: z.boolean().optional(),
              goal_type: z.enum(['freekick', 'penalty', 'open']).optional(),
            })
            .optional(),
        })
        .optional(),
      deleted: z.boolean().optional(),
    }),
  };

  // Validation schema for deleting a match
  delete = {
    params: z.object({
      id: z.string().min(1).max(255).refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
  };

  // Validation schema for retrieving matches with specific criteria
  find = {
    query: z.object({
      match_date: z.date().optional(),
      home_team: z.string().optional(),
      away_team: z.string().optional(),
      deleted: z.boolean().optional(),
    }),
  };

  // Validation schema for searching home team fouls
  searchHomeTeamFouls = {
    query: z.object({
      'fouls.home_team_fouls.player_name': z.string().optional(),
      'fouls.home_team_fouls.foul_type': z.enum(['freekick', 'yellow', 'red']).optional(),
    }),
  };

  // Validation schema for searching away team fouls
  searchAwayTeamFouls = {
    query: z.object({
      'fouls.away_team_fouls.player_name': z.string().optional(),
      'fouls.away_team_fouls.foul_type': z.enum(['freekick', 'yellow', 'red']).optional(),
    }),
  };

  // Validation schema for searching home team goals
  searchHomeTeamGoals = {
    query: z.object({
      'goals.home_team.player_name': z.string().optional(),
      'goals.home_team.allowed': z.boolean().optional(),
      'goals.home_team.goal_type': z.enum(['freekick', 'penalty', 'open']).optional(),
    }),
  };

  // Validation schema for searching away team goals
  searchAwayTeamGoals = {
    query: z.object({
      'goals.away_team.player_name': z.string().optional(),
      'goals.away_team.allowed': z.boolean().optional(),
      'goals.away_team.goal_type': z.enum(['freekick', 'penalty', 'open']).optional(),
    }),
  };
}

export const matchValidation = new Validation();
