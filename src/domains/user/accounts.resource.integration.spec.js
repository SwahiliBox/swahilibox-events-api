import { describeDbTestSuite } from '../../test/describeDbTestSuite';
import { accountResource } from './accounts.resource';

describeDbTestSuite('AccountResource', () => {
  describe('create account', () => {
    test('it should create an account', async () => {
      const user = {
        email: 'sample@example.com',
        password: '1234sdf',
      };

      const createdAccountKeys = [
        'id',
        'email',
        'password',
        'role',
        'active',
        'deletedAt',
        'deletionReason',
        'createdAt',
        'updatedAt',
      ];
      const createdAccount = await accountResource.create(user);
      expect(createdAccount).toMatchObject(user);
      expect(createdAccount.active).toBe(false);
      expect(createdAccount.role).toBe('normal');
      expect(Object.keys(createdAccount)).toEqual(
        expect.arrayContaining(createdAccountKeys),
      );
    });
  });
});
