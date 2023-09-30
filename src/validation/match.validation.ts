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
        .array(
          z.object({
            player_name: z.string().min(1).max(255).optional(),
            foul_type: z.enum(['freekick', 'yellow', 'red']).optional(),
          }),
        )
        .optional(),
      goals: z
        .array(
          z.object({
            player_name: z.string().min(1).max(255).optional(),
            allowed: z.boolean().optional(),
            goal_type: z.enum(['freekick', 'penalty', 'open']).optional(),
            home: z.boolean().optional(),
          }),
        )
        .optional(),
      deleted: z.boolean().optional(),
    }),
  };

  // Validation schema for updating an existing match
  update = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
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
        .array(
          z.object({
            player_name: z.string().min(1).max(255).optional(),
            foul_type: z.enum(['freekick', 'yellow', 'red']).optional(),
            home: z.boolean().optional(),
          }),
        )
        .optional(),
      goals: z
        .array(
          z.object({
            player_name: z.string().min(1).max(255).optional(),
            allowed: z.boolean().optional(),
            goal_type: z.enum(['freekick', 'penalty', 'open']).optional(),
            home: z.boolean().optional(),
          }),
        )
        .optional(),
      deleted: z.boolean().optional(),
    }),
  };

  // Validation schema for deleting a match
  delete = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
  };

  // Validation schema for retrieving matches with specific criteria
  find = {
    query: z.object({
      match_date: z.string().optional(),
      home_team: z.string().optional(),
      away_team: z.string().optional(),
      deleted: z.string().optional(),
    }),
  };

  // Validation schema for searching home team fouls
  searchHomeTeamFouls = {
    query: z.object({
      player_name: z.string().optional(),
      foul_type: z.enum(['freekick', 'yellow', 'red']).optional(),
      home: z.string().optional(),
    }),
  };

  // Validation schema for searching away team fouls
  searchAwayTeamFouls = {
    query: z.object({
      player_name: z.string().optional(),
      foul_type: z.enum(['freekick', 'yellow', 'red']).optional(),
      home: z.string().optional(),
    }),
  };

  // Validation schema for searching home team goals
  searchHomeTeamGoals = {
    query: z.object({
      player_name: z.string().optional(),
      allowed: z.string().optional(),
      goal_type: z.enum(['freekick', 'penalty', 'open']).optional(),
      home: z.string().optional(),
    }),
  };

  // Validation schema for searching away team goals
  searchAwayTeamGoals = {
    query: z.object({
      player_name: z.string().optional(),
      allowed: z.string().optional(),
      goal_type: z.enum(['freekick', 'penalty', 'open']).optional(),
      home: z.string().optional(),
    }),
  };
}

export const matchValidation = new Validation();
