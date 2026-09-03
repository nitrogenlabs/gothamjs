import * as Gotham from './index.js';

describe('public UI exports', () => {
  it.each([
    'AuthSignInView',
    'AuthSignUpView',
    'AuthView',
    'DefaultView',
    'Gotham',
    'GothamProvider',
    'GothamRoot',
    'HomeView',
    'LoaderView',
    'MenuView',
    'NotFoundView'
  ])('exports %s from the package root', (exportName) => {
    expect(Gotham).toHaveProperty(exportName);
  });

  it('exports Markdown from the package root', () => {
    expect(Gotham).toHaveProperty('Markdown');
    expect(Gotham).not.toHaveProperty('MarkdownView');
  });
});
