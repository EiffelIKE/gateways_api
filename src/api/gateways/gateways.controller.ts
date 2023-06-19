import { Request, Response, NextFunction } from 'express';
import { ParamsWithId } from '../../interfaces';
import { Gateway, GatewayWithId } from './gateways.model';
import { list, saveGateway, findOne, updateById, deleteById } from './gateways.store';

export const getAll = async (req: Request, res: Response<GatewayWithId []>, next: NextFunction) => {
  try {
    const results = await list();
    res.json(results);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request<ParamsWithId, GatewayWithId, {}>, res: Response<GatewayWithId>, next: NextFunction) => {
  const { id } = req.params;
  try {
    const results = await findOne(id);
    if (!results) {
      res.status(404);
      throw new Error(`Gateway with id:${id} not found`);
    }
    res.json(results);
  } catch (err) {
    next(err);
  }
};

export const createOne = async (req: Request<{}, GatewayWithId, Gateway>, res: Response<GatewayWithId>, next: NextFunction) => {
  const { body } = req;
  if (body.devices.length > 0) {
    body.devices = body.devices.map(device => ({ ...device, created_at: new Date() }));
  }
  try {
    const id = await saveGateway(body);
    res.status(201);
    return res.json({
      _id: id,
      ...body,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOne = async (req: Request<ParamsWithId, GatewayWithId, Gateway>, res: Response<GatewayWithId>, next: NextFunction) => {
  const { id } = req.params;
  try {
    const results = await updateById(req.body, id);
    if (!results) {
      res.status(404);
      throw new Error(`Gateway with id:${id} not found`);
    }
    res.json(results);
  } catch (err) {
    next(err);
  }
};

export const deletOne = async (req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) => {
  const { id } = req.params;
  try {
    const results = await deleteById(id);
    if (!results) {
      res.status(404);
      throw new Error(`Gateway with id:${id} not found`);
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};