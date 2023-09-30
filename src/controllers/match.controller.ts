import { Request, Response } from 'express';
import { matchService } from '../services';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES } from '../constants';
import { notificationController } from './notification.controller';

class Controller {
  async create(req: Request, res: Response) {
    const data = await matchService.create(req.body);

    if (!data) return InternalErrorResponse(res);

    return SuccessResponse(res, data);
  }

  async getAll(req: Request, res: Response) {
    let pagination = parseInt(req.params.pagination);
    if (!pagination) pagination = 1;
    const data = await matchService.getAll(pagination);

    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  async find(req: Request, res: Response) {
    const data = await matchService.find(req.query);

    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  async update(req: Request, res: Response) {
    const { matchId } = req.params;
    const data = await matchService.update({ _id: matchId }, req.body);

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.UPDATED);
  }

  async updateHalfTime(req: Request, res: Response) {
    await this.update(req, res);
    let data = await matchService.findOne({ _id: req.params.id });
    if (!data) return NotFoundResponse(res);

    let broadcast = await notificationController.broadcast(
      `${data.home_team} vs ${data.away_team}`,
      `Half Time!`,
    );
    if (!broadcast) console.log('Broadcast not sent succesfully');
  }

  async updateFullTime(req: Request, res: Response) {
    await this.update(req, res);
    let data = await matchService.findOne({ _id: req.params.id });
    if (!data) return NotFoundResponse(res);

    let broadcast = await notificationController.broadcast(
      `${data.home_team} vs ${data.away_team}`,
      `Full Time!`,
    );
    if (!broadcast) console.log('Broadcast not sent succesfully');
  }

  async updateFreekickFoul(req: Request, res: Response) {
    await this.update(req, res);
    let data = await matchService.findOne({ _id: req.params.id });
    if (!data) return;

    let broadcast = await notificationController.broadcast(
      `${data.home_team} vs ${data.away_team}`,
      `Free kick!`,
    );
    if (!broadcast) console.log('Broadcast not sent succesfully');
  }

  async updateYellowCardFoul(req: Request, res: Response) {
    await this.update(req, res);
    let data = await matchService.findOne({ _id: req.params.id });
    if (!data) return NotFoundResponse(res);

    let broadcast = await notificationController.broadcast(
      `${data.home_team} vs ${data.away_team}`,
      `Yellow card!`,
    );
    if (!broadcast) console.log('Broadcast not sent succesfully');
  }

  async updateRedCardFoul(req: Request, res: Response) {
    await this.update(req, res);
    let data = await matchService.findOne({ _id: req.params.id });
    if (!data) return NotFoundResponse(res);

    let broadcast = await notificationController.broadcast(
      `${data.home_team} vs ${data.away_team}`,
      `Red card!`,
    );
    if (!broadcast) console.log('Broadcast not sent succesfully');
  }

  async updateGoal(req: Request, res: Response) {
    await this.update(req, res);
    let data = await matchService.findOne({ _id: req.params.id });
    if (!data) return NotFoundResponse(res);

    let broadcast = await notificationController.broadcast(
      `${data.home_team} vs ${data.away_team}`,
      `Goal!`,
    );
    if (!broadcast) console.log('Broadcast not sent succesfully');
  }

  async delete(req: Request, res: Response) {
    const { matchId } = req.params;
    const data = await matchService.softDelete({ _id: matchId });

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }

  async hardDelete(req: Request, res: Response) {
    const { matchId } = req.params;
    const data = await matchService.hardDelete({ _id: matchId });

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }

  async findHomeTeamFouls(req: Request, res: Response) {
    // Implement logic for searching home team fouls here
    // For example, you can use matchService to search for fouls in the home team
    const data = await matchService.find({
      home_team_fouls: req.query,
    });

    if (!data) {
      return InternalErrorResponse(res);
    }

    if (data.length === 0) {
      return NotFoundResponse(res, 'No home team fouls found.');
    }

    return SuccessResponse(res, data);
  }

  async findAwayTeamFouls(req: Request, res: Response) {
    // Implement logic for searching away team fouls here
    // For example, you can use matchService to search for fouls in the away team
    const data = await matchService.find({
      away_team_fouls: req.query,
    });

    if (!data) {
      return InternalErrorResponse(res);
    }

    if (data.length === 0) {
      return NotFoundResponse(res, 'No home team fouls found.');
    }

    return SuccessResponse(res, data);
  }

  async findHomeTeamGoals(req: Request, res: Response) {
    // Implement logic for searching home team goals here
    // For example, you can use matchService to search for goals in the home team
    const data = await matchService.find({
      goals: { home_team: req.query },
    });

    if (!data) {
      return InternalErrorResponse(res);
    }

    if (data.length === 0) {
      return NotFoundResponse(res, 'No home team fouls found.');
    }

    return SuccessResponse(res, data);
  }

  async findAwayTeamGoals(req: Request, res: Response) {
    // Implement logic for searching away team goals here
    // For example, you can use matchService to search for goals in the away team
    const data = await matchService.find({
      goals: { away_team: req.query },
    });

    if (!data) {
      return InternalErrorResponse(res);
    }

    if (data.length === 0) {
      return NotFoundResponse(res, 'No home team fouls found.');
    }

    return SuccessResponse(res, data);
  }
}

export const matchController = new Controller();
