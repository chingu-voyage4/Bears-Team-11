const Project = require('../api/stubs/project');

describe('Project', function() {
  test('find project by id', () => {
    const project = Project.findById(2);
    expect(project).toBeDefined;
    expect(project[2].id).toBe(2);
    expect(project[2].name).toBe('Momentum Dash');
  });

  test('find project that does not exist by id', () => {
    const project = Project.findById(5000);
    expect(project).toBeUndefined;
  });

  test('find project by name', () => {
    const project = Project.find({ name: 'Momentum Dash' });
    expect(project).toBeDefined;
    expect(project.id).toBe(2);
    expect(project.creator).toBe('lilgangwolf');
  });

  test('find project that does not exist', () => {
    const project = Project.find({ name: 'Chingu Sort' });
    expect(project).toBeUndefined;
  })
});