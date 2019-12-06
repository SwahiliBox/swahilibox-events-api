import { describeDbTestSuite } from '../../test/describeDbTestSuite';
import { skillsResource } from './skills.resource';
import { SkillNotFoundError } from './skill.errors';

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

  describe('getSkillByName', () => {
    test('it should throw an error if skill not found', async () => {
      try {
        await skillsResource.getSkillByName('javascript');
      } catch (error) {
        expect(error).toBeInstanceOf(SkillNotFoundError);
        expect(error.message).toBe('no skill with name javascript found');
      }
    });
    test('it should get a skill given a valid name', async () => {
      await skillsResource.create({ name: 'javascript' });
      const skill = await skillsResource.getSkillByName('javascript');
      expect(skill).not.toBe(null);
      expect(skill.name).toBe('javascript');
    });
  });

  describe('getSkillsByTags', () => {
    const createSkillBody1 = {
      name: 'ember',
      tags: ['ember', 'ember.js', 'emberjs', 'ember js', 'javascript'],
    };
    const createSkillBody2 = {
      name: 'react',
      tags: ['react js', 'javascript'],
    };

    test('it should get only the skills with both given tags', async () => {
      await skillsResource.create(createSkillBody1);
      await skillsResource.create(createSkillBody2);
      const skills = await skillsResource.getSkillsByTags([
        'ember',
        'javascript',
      ]);
      expect(skills).not.toBe(null);
      expect(skills.length).toEqual(1);
      expect(skills[0].name).toEqual('ember');
    });

    test('it should get all skills with the given tag', async () => {
      await skillsResource.create(createSkillBody1);
      await skillsResource.create(createSkillBody2);
      const skills = await skillsResource.getSkillsByTags(['javascript']);
      expect(skills).not.toBe(null);
      expect(skills.length).toEqual(2);
      expect(skills[0].name).toEqual('ember');
      expect(skills[1].name).toEqual('react');
    });
  });

  describe('updateSkill', () => {
    const createSkillBody = {
      name: 'ember',
      tags: ['emberjs'],
    };

    test('it should update skill name', async () => {
      const createdSkill = await skillsResource.create(createSkillBody);
      const updatedSkill = await skillsResource.updateSkill(
        {
          name: 'emberjs',
        },
        createdSkill.id,
      );
      expect(updatedSkill).toHaveProperty('name', 'emberjs');
    });

    test('it should update skill status', async () => {
      const createdSkill = await skillsResource.create(createSkillBody);
      const updatedSkill = await skillsResource.updateSkill(
        {
          status: 'approved',
        },
        createdSkill.id,
      );
      expect(createdSkill).toHaveProperty('status', 'awaiting_approval');
      expect(updatedSkill).toHaveProperty('status', 'approved');
    });

    test('it should update skill tags', async () => {
      const createdSkill = await skillsResource.create(createSkillBody);
      const updatedSkill = await skillsResource.updateSkill(
        {
          tags: ['ember', 'javascript'],
        },
        createdSkill.id,
      );
      expect(updatedSkill).toHaveProperty('tags', [
        'emberjs',
        'ember',
        'javascript',
      ]);
    });
  });
  describe('removeSkillTag', () => {
    const createSkillBody = {
      name: 'ember',
      tags: ['emberjs', 'javascript', 'frontend'],
    };
    test('it should remove a tag from a skill', async () => {
      const createdSkill = await skillsResource.create(createSkillBody);
      await skillsResource.removeSkillTag('javascript', createdSkill.id);
      const updatedSkill = await skillsResource.getSkillByName('ember');
      expect(updatedSkill).toHaveProperty('tags', ['emberjs', 'frontend']);
    });
  });
});
