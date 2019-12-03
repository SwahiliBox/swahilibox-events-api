import { skillsResource } from './skills.resource';

class SkillsService {
  async create(createSkillBody) {
    const skill = await skillsResource.create(createSkillBody);
    return skill;
  }
}

export const skillsService = new SkillsService();
