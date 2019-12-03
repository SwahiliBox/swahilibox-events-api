import { describeDbTestSuite } from '../../test/describeDbTestSuite';
import { skillsResource } from './skills.resource';

describeDbTestSuite('SkillsResource', () => {
  describe('create skill', () => {
    const pgUniqueViolationErrorCode = '23505';
    const createSkillBody = {
      name: 'ember',
      tags: ['ember', 'ember.js', 'emberjs', 'ember js'],
    };
    test('it should create a skill successfully', async () => {
      const createdSkill = await skillsResource.create(createSkillBody);
      expect(createdSkill).not.toBe(null);
      expect(createdSkill.name).toBe(createSkillBody.name);
      expect(createdSkill).toHaveProperty('id');
    });

    test('should not create skill with duplicate name', async () => {
      try {
        await skillsResource.create(createSkillBody);
      } catch (error) {
        expect(error).not.toBe(null);
        expect(error.code).toEqual(pgUniqueViolationErrorCode);
      }
    });
  });
});
