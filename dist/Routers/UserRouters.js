import express from 'express';
export const UserRouter = express.Router();
UserRouter.get('/users', (req, res) => {
    res.json({ status: true });
});
