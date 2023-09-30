import { Schema, model } from 'mongoose';
import { DATABASES } from '../../constants';
import IMatch from '../../interfaces/match.interface';

const foulTypeEnum = ['freekick', 'yellow', 'red'];
const goalTypeEnum = ['freekick', 'penalty', 'open'];

const MatchSchema = new Schema<IMatch>(
  {
    match_date: {
      type: Date,
      default: Date.now,
    },
    home_team: {
      type: String,
      required: true,
    },
    away_team: {
      type: String,
      required: true,
    },
    full_time_score: {
      type: {
        home_team_score: {
          type: Number,
          default: 0,
        },
        away_team_score: {
          type: Number,
          default: 0,
        },
      },
    },
    fouls: {
      type: [
        {
          home: {
            type: Boolean,
            default: true, // Indicates home team
          },
          player_name: String,
          foul_type: {
            type: String,
            enum: foulTypeEnum,
            default: 'freekick',
          },
        },
      ],
      default: [],
    },
    goals: {
      type: [
        {
          home: {
            type: Boolean,
            default: true, // Indicates home team
          },
          player_name: String,
          allowed: {
            type: Boolean,
            default: true,
          },
          goal_type: {
            type: String,
            enum: goalTypeEnum,
            default: 'freekick',
          },
        },
      ],
      default: [],
    },
    deleted: {
      type: Boolean,
      select: false,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IMatch>(DATABASES.MATCH, MatchSchema);
