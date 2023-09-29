import { Schema, model } from 'mongoose';
import { DATABASES } from '../../constants';
import IMatch from '../../interfaces/match.interface';

const MatchSchema = new Schema<IMatch>(
  {
    match_date: {
      type: Date,
      default: Date.now,
    },
    home_team: {
      type: String,
    },
    away_team: {
      type: String,
    },
    full_time_score: {
      home_team_score: {
        type: Number,
        default: 0,
      },
      away_team_score: {
        type: Number,
        default: 0,
      },
    },
    fouls: {
      home_team_fouls: {
        type: [
          {
            player_name: String,
            foul_type: {
              type: String,
              enum: ['freekick', 'yellow', 'red'],
            },
          },
        ],
        default: [],
      },
      away_team_fouls: {
        type: [
          {
            player_name: String,
            foul_type: {
              type: String,
              enum: ['freekick', 'yellow', 'red'],
            },
          },
        ],
        default: [],
      },
    },
    goals: {
      home_team: {
        player_name: String,
        allowed: Boolean,
        goal_type: {
          type: String,
          enum: ['freekick', 'penalty', 'open'],
        },
      },
      away_team: {
        player_name: String,
        allowed: {
          default: true,
          type: Boolean,
        },
        goal_type: {
          type: String,
          enum: ['freekick', 'penalty', 'open'],
        },
      },
    },
    deleted: {
      type: Boolean,
      select: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IMatch>(DATABASES.MATCH, MatchSchema);
