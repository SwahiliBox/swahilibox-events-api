import { knexInstance } from '../../database/knexInstance';
import { SkillNotFoundError } from './skill.errors';

const SKILLS_TABLE = 'skills';

class SkillsResource {
  async create(createSkillBody) {
    const created = await knexInstance(SKILLS_TABLE).insert(
      createSkillBody,
      '*',
    );
    return created[0];
  }

  async getSkillByName(skillName) {
    const skill = await knexInstance(SKILLS_TABLE)
      .select('*')
      .where('name', skillName)
      .first();

    if (!skill) {
      throw new SkillNotFoundError(
        404,
        `no skill with name ${skillName} found`,
      );
    }
    return skill;
  }

  async updateSkill(updateBody, skillId) {
    const updatedSkill = await knexInstance(SKILLS_TABLE)
      .update(updateBody)
      .where('id', skillId)
      .returning(['id', 'name', 'tags']);

    return updatedSkill;
  }

  async updateSkillNameOrStatus(field, value, skillId) {
    const updatedSkill = await knexInstance(SKILLS_TABLE)
      .update(field, value)
      .where('id', skillId)
      .returning(['id', 'name', 'tags']);

    return updatedSkill;
  }

  async getSkillsByTags(tags) {
    const skills = knexInstance(SKILLS_TABLE)
      .select('*')
      .where(knexInstance.raw(`tags @> '{${tags}}'`));

    if (!skills) {
      throw new SkillNotFoundError(404, `no skill with tags ${tags} found`);
    }

    return skills;
  }
}

export const skillsResource = new SkillsResource();
