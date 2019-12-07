import { Router } from 'express';
import { protectedAsyncRequestHandler } from '../../lib/util/protectedAsyncHandler';
import { skillsService } from './skills.service';

export function getSkillsRouter() {
  const skillsRouter = Router();

  skillsRouter.post(
    '/skills',
    protectedAsyncRequestHandler(async (req, res) => {
      const skill = await skillsService.create(req.body);
      res.status(201).json({ message: 'skill created', skill });
    }),
  );

  skillsRouter.put(
    '/skills/:id',
    protectedAsyncRequestHandler(async (req, res) => {
      const updatedSkill = await skillsService.updateSkill(
        req.body,
        req.params.id,
      );
      res.status(200).json({ message: 'skill updated', skill: updatedSkill });
    }),
  );

  skillsRouter.get(
    '/skills',
    protectedAsyncRequestHandler(async (req, res) => {
      const skills = await skillsService.getSkills(req.query);
      res.status(200).json({ message: 'success', skills });
    }),
  );

  skillsRouter.delete(
    '/skills/:id',
    protectedAsyncRequestHandler(async (req, res) => {
      await skillsService.deleteSkill(req.params.id);
      res.status(200).json({ message: 'skill deleted successfully' });
    }),
  );

  return skillsRouter;
}
