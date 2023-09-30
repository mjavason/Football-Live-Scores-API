import { Document } from 'mongoose';

interface IFoul {
  player_name: string;
  foul_type: 'freekick' | 'yellow' | 'red';
}

interface IGoal {
  player_name: string;
  allowed: boolean;
  goal_type: 'freekick' | 'penalty' | 'open';
}

export default interface IMatch extends Document {
  match_date: Date;
  home_team: string;
  away_team: string;
  full_time_score: {
    home_team_score: number;
    away_team_score: number;
  };
  fouls: IFoul[]; // Combined fouls for both home and away teams
  goals: IGoal[]; // Combined goals for both home and away teams
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
