describe('Funcionalidade de Login da Khan Academy', () => {
  beforeEach(() => {

    cy.visit('https://pt.khanacademy.org/login');

    cy.setCookie('OptanonAlertBoxClosed', new Date().toISOString());

    cy.reload();
  });

  it('CT-003: Deve realizar o login com sucesso usando credenciais válidas', () => {
    const username = Cypress.env('KHAN_USERNAME');
    const password = Cypress.env('KHAN_PASSWORD');

    if (!username || !password) {
      throw new Error('As variáveis de ambiente KHAN_USERNAME e KHAN_PASSWORD não estão definidas.');
    }

    cy.get('[data-testid="identifier-field"]').type(username);
    cy.get('[data-testid="password-field"]').type(password);
    cy.get('[data-testid="log-in-submit-button"]').click();

    cy.url().should('include', '/profile/me/courses');
    cy.get('[data-testid="header-profile-button"]')
      .should('be.visible')
      .and('contain.text', 'teste dotGroup');
  });

  it('CT-004: Deve exibir uma mensagem de erro ao tentar logar com senha incorreta', () => {

    const username = Cypress.env('KHAN_USERNAME');
    const wrongPassword = 'wrong-password-123';

    if (!username) {
        throw new Error('A variável de ambiente KHAN_USERNAME não está definida.');
    }
    
    // Act
    cy.get('[data-testid="identifier-field"]').type(username);
    cy.get('[data-testid="password-field"]').type(wrongPassword);
    cy.get('[data-testid="log-in-submit-button"]').click();

    // Assert
    cy.get('span[role="alert"]')
      .should('be.visible')
      .and('have.text', 'Seu login ou senha está incorreto(a).');
  });
});