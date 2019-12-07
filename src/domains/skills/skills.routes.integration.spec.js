import { describeDbTestSuite } from '../../test/describeDbTestSuite';
import { makeApiCall } from '../../test/helpers';

describeDbTestSuite('accountsRouter', () => {
  describe('create skill', () => {
    const createSkillBody = {
      name: 'javascript',
      tags: ['javascript', 'js'],
    };
    test('it should create a skill', async () => {
      const response = await makeApiCall('skills', 'post', createSkillBody);
      expect(response.body.skill).toMatchObject(createSkillBody);
      expect(response.body).toHaveProperty('skill.id');
    });

    test('it should not create skill with duplicate name', async () => {
      await makeApiCall('skills', 'post', createSkillBody);
      const response = await makeApiCall('skills', 'post', createSkillBody);
      expect(response.body.message).toContain(
        'duplicate key value violates unique constraint',
      );
    });
  });
  describe('getSkills', () => {
    const skills = [
      {
        name: 'express',
        tags: ['javascript', 'js'],
      },
      {
        name: 'react',
        tags: ['javascript', 'reactjs'],
      },
      { name: 'python' },
      { name: 'flutter' },
      { name: 'dart' },
    ];

    test('it should fetch all skills', async () => {
      const createSkillPromises = skills.map(skill =>
        makeApiCall('skills', 'post', skill),
      );
      await Promise.all(createSkillPromises);
      const response = await makeApiCall('skills', 'get');
      expect(response.body.skills).toHaveLength(5);
    });

    test('it should fetch only the first 2 skills', async () => {
      const createSkillPromises = skills.map(skill =>
        makeApiCall('skills', 'post', skill),
      );
      await Promise.all(createSkillPromises);
      const response = await makeApiCall('skills?limit=5', 'get');
      expect(response.body.skills).toHaveLength(5);
    });

    test('it should fetch a skill by name', async () => {
      const createSkillPromises = skills.map(skill =>
        makeApiCall('skills', 'post', skill),
      );
      await Promise.all(createSkillPromises);
      const response = await makeApiCall('skills?name=react', 'get');
      expect(response.body.skills).toHaveProperty('name', 'react');
    });

    test('it should fetch all skills with given tag', async () => {
      const createSkillPromises = skills.map(skill =>
        makeApiCall('skills', 'post', skill),
      );
      await Promise.all(createSkillPromises);
      const response = await makeApiCall('skills?tags[]=javascript', 'get');
      expect(response.body.skills).toHaveLength(2);
    });

    test('it should fetch only the skills with the given tags', async () => {
      const createSkillPromises = skills.map(skill =>
        makeApiCall('skills', 'post', skill),
      );
      await Promise.all(createSkillPromises);
      const response = await makeApiCall(
        'skills?tags[]=javascript&tags[]=js',
        'get',
      );
      expect(response.body.skills).toHaveLength(1);
      expect(response.body.skills[0]).toHaveProperty('name', 'express');
    });
  });

  describe('updateSkill', () => {
    const createSkillBody = {
      name: 'java',
      tags: ['javascript', 'js'],
    };

    test('it should update a skill', async () => {
      const response = await makeApiCall('skills', 'post', createSkillBody);
      const { skill } = response.body;
      const updateSkillResponse = await makeApiCall(
        `skills/${skill.id}`,
        'put',
        { name: 'javascript', tags: ['express'] },
      );

      const { skill: updatedSkill } = updateSkillResponse.body;
      expect(skill.id).toEqual(updatedSkill.id);
      expect(updatedSkill).toHaveProperty('name', 'javascript');
      expect(updatedSkill).toHaveProperty('tags', [
        'javascript',
        'js',
        'express',
      ]);
    });
  });

  describe('deleteSkill', () => {
    test('it should delete a skill', async () => {
      const createSkillBody = {
        name: 'javascript',
        tags: ['javascript', 'js'],
      };
      const response = await makeApiCall('skills', 'post', createSkillBody);
      const { skill } = response.body;
      await makeApiCall(`skills/${skill.id}`, 'delete');
      const fetchSkillResponse = await makeApiCall(
        `skills?id=${skill.id}`,
        'get',
      );
      expect(fetchSkillResponse.body).toHaveProperty(
        'message',
        `no skill with id ${skill.id} found`,
      );
    });
  });
});
