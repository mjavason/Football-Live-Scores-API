import { Request, Response } from 'express';
import { matchService } from '../services';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES } from '../constants';

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
  }

  async findAwayTeamFouls(req: Request, res: Response) {
    // Implement logic for searching away team fouls here
  }

  async findHomeTeamGoals(req: Request, res: Response) {
    // Implement logic for searching home team goals here
  }

  async findAwayTeamGoals(req: Request, res: Response) {
    // Implement logic for searching away team goals here
  }
}

export const matchController = new Controller();
