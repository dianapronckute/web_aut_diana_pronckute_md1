describe('List Item Test', () => {

   
        beforeEach(() => {
            // Stub network requests to prevent fetching unnecessary resources
            cy.intercept('GET', '**/pagead2.googlesyndication.com/**', {
              statusCode: 200,
              body: '',
            }).as('googleAdsRequest');

            cy.intercept('GET', '**/serving.stat-rock.com/**', {
                statusCode: 200,
                body: '',
              }).as('googleAdsRequest2');

              cy.intercept('GET', '**/www.google-analytics.com/**', {
                statusCode: 200,
                body: '',
              }).as('googleAdsRequest3');
          });

 it('Clicks on "Grid" and then checks if the item is active', () => {
      // Visit your webpage
      cy.visit('https://demoqa.com/selectable');
  
      // Click on the "Grid" tab
      cy.get('#demo-tab-grid').click();

      // Assert that the "Grid" tab is active
      cy.get('#demo-tab-grid').should('have.class', 'active');

      // Get the <li> element and click on it
      cy.contains('.list-group-item', 'Two').click();
  
      // Get the <li> element and click on it
      cy.contains('.list-group-item', 'Four').click();
  
      // Get the <li> element and click on it
      cy.contains('.list-group-item', 'Six').click();
  
      // Get the <li> element and click on it
      cy.contains('.list-group-item', 'Eight').click();
  
      // Assert that the clicked <li> element has the 'active' class
      cy.get('.list-group-item.active').should('have.text', 'TwoFourSixEight');

      cy.get('.list-group-item').each(($item) => {
        const text = $item.text();
        if (['One', 'Three', 'Five', 'Seven','Nine'].includes(text)) {
          cy.wrap($item).should('not.have.class', 'active');
        }
    });
    
      // Wait for the stubbed network request to complete
    cy.wait('@googleAdsRequest');
    });
  });
  