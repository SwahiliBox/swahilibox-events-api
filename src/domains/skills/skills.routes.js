import { Router } from 'express';
import { protectedAsyncRequestHandler } from '../../lib/util/protectedAsyncHandler';
import { skillsService } from './skills.service';

export function getSkillsRouter() {
  const skillsRouter = Router();

  skillsRouter.post(
    '/skills/create',
    protectedAsyncRequestHandler(async (req, res) => {
      const skill = await skillsService.create(req.body);
      res.status(201).json({ message: 'skill created', skill });
    }),
  );

  return skillsRouter;
}
