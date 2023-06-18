import { Router } from 'express';
import * as controller from './gateways.controller';
import { Gateway } from './gateways.model';
import { validateRequest } from '../../middlewares';

import { ParamsWithId } from '../../interfaces';

const router = Router();

router.get('/list', controller.getAll);
router.get(
  '/:id', 
  validateRequest({
    params: ParamsWithId,
  }),
  controller.getOne,
);

router.post(
  '/', 
  validateRequest(
    { body: Gateway },
  ),
  controller.createOne,
);

router.put(
  '/:id', 
  validateRequest({
    body: Gateway,
    params: ParamsWithId,
  }),
  controller.updateOne,
);

router.delete(
  '/:id', 
  validateRequest({
    params: ParamsWithId,
  }),
  controller.deletOne,
);

export default router;