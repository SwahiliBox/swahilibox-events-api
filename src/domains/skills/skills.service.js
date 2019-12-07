import { skillsResource } from './skills.resource';

class SkillsService {
  async create(createSkillBody) {
    const skill = await skillsResource.create(createSkillBody);
    return skill;
  }

  async getSkills(reqQuery) {
    let skills;
    if (reqQuery.name) {
      skills = await skillsResource.getSkillByName(reqQuery.name);
    } else if (reqQuery.id) {
      skills = await skillsResource.getSkillById(reqQuery.id);
    } else if (reqQuery.tags) {
      skills = await skillsResource.getSkillsByTags(reqQuery.tags);
    } else {
      const { page = 1, limit = 10 } = reqQuery;
      const offset = (page - 1) * limit;
      skills = await skillsResource.getAllSkills(offset, limit);
    }
    return skills;
  }

  async updateSkill(updateBody, skillId) {
    return skillsResource.updateSkill(updateBody, skillId);
  }

  async removeSkillTag(tag, skillId) {
    return skillsResource.removeSkillTag(tag, skillId);
  }

  async deleteSkill(skillId) {
    return skillsResource.deleteSkill(skillId);
  }
}

export const skillsService = new SkillsService();
