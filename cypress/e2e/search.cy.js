describe('Funcionalidade de Busca da Khan Academy', () => {
  beforeEach(() => {
    cy.visit('https://pt.khanacademy.org/');
    
    cy.get('body').then(($body) => {
      if ($body.find('#onetrust-accept-btn-handler').length > 0) {
        cy.get('#onetrust-accept-btn-handler').click();
      }
    });

    cy.get('[data-testid="navbar-search-button"]').should('be.visible').click();
  });

  it('CT-001: Deve realizar uma busca por "Matemática" e encontrar resultados', () => {
 
    const searchInputSelector = '[data-testid="page-search-box"]';
    const searchTerm = 'Matemática';

    cy.get(searchInputSelector)
      .should('be.visible')
      .type(`${searchTerm}{enter}`);

    // Assert
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    cy.url()
      .should('include', '/search')
      .and('include', `page_search_query=${encodedSearchTerm}`);

    cy.get(searchInputSelector).should('have.value', searchTerm);
    cy.get('#indexed-search-results ul li').should('have.length.greaterThan', 0);
    cy.get('#indexed-search-results ul').contains('matemática', { matchCase: false });
  });

  it('CT-002: Deve realizar uma busca por um termo inválido e não encontrar resultados', () => {

    const searchInputSelector = '[data-testid="page-search-box"]';
    const invalidSearchTerm = 'asdfghjkl';


    cy.get(searchInputSelector)
      .should('be.visible')
      .type(`${invalidSearchTerm}{enter}`);

    cy.url()
      .should('include', '/search')
      .and('include', `page_search_query=${invalidSearchTerm}`);

    cy.contains('Nenhum resultado.').should('be.visible');
    cy.contains('Tente outro termo para pesquisa.').should('be.visible');
  });
});