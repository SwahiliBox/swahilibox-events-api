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

    if (!skill.length) {
      throw SkillNotFoundError(404, `no skill with name ${skillName} found`);
    }
    return skill;
  }
}

export const skillsResource = new SkillsResource();
