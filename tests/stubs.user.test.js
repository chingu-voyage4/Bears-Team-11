const User = require('../api/stubs/User');

describe('User', function() {
  test('find user by id', () => {
    const user = User.findById(1);
    expect(user).toBeDefined;
    expect(user.id).toBe(1);
    expect(user.name).toBe(`King T'Challa`);
    expect(user.username).toBe('BlackPanther');
  });

  test('find user that does not exist by id', () => {
    const user = User.findById(9000);
    expect(user).toBeUndefined;
  });

  test('find user by username', () => {
    const user = User.find({ username: 'BlackPanther' });
    expect(user).toBeDefined;
    expect(user.id).toBe(1);
    expect(user.name).toBe(`King T'Challa`);
    expect(user.username).toBe('BlackPanther');
  });

  test('find user that does not exist', () => {
    const user = User.find({ username: 'BlackMamba' });
    expect(user).toBeUndefined;
  });
});
