import express from 'express';

const router = express.Router();

type NumbersResponse = string[];

router.get<{}, NumbersResponse>('/', (req, res) => {
  res.json(['1', '2', '3']);
});

export default router;
