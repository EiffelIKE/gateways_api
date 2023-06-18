import express from 'express';

import { MessageResponse } from '../interfaces';
import gateways from './gateways/gateways.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - API root PATH',
  });
});

router.use('/gateways', gateways);

export default router;
