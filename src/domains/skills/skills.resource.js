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
    const skill = updateBody;
    if (skill.tags) {
      skill.tags = knexInstance.raw('array_cat(tags, ?)', [updateBody.tags]);
    }
    const updatedSkill = await knexInstance(SKILLS_TABLE)
      .update(skill)
      .where('id', skillId)
      .returning(['id', 'name', 'status', 'tags']);

    return updatedSkill[0];
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

  async removeSkillTag(tag, skillId) {
    await knexInstance(SKILLS_TABLE)
      .update({
        tags: knexInstance.raw('array_remove(tags, ?)', tag),
      })
      .where('id', skillId);
  }
}

export const skillsResource = new SkillsResource();
