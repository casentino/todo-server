import express from 'express';

const router = express.Router();

router.get('/', (res, req) => {});
router.post('/');
router.get('/:id');
router.put('/:id');
router.delete('/:id');

export default router;
