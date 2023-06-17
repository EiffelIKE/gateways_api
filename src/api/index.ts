import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import numbers from './numbers';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - API root PATH',
  });
});

router.use('/numbers', numbers);

export default router;
