describe('First Challenge', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="accept-button"]', { timeout: 10000 }).click();  // cookies
  })

  it('finds the next completed movie of Nicolas Cage', () => {
    cy.get('[id="suggestion-search"]').type('Nicolas Cage');
    cy.get('[data-testid="search-result--const"]').first().should('include.text', 'Nicolas Cage').click();
    cy.get('[id="actor-upcoming-projects"]').click();
    cy.get('[data-testid="accordion-item-content-container"]').children().contains('Completed').first().parent().parent().click();
    cy.get('[data-testid="hero__primary-text"]').should('have.text', 'The Gunslingers');
  })

  it('rates the second top box office movie for 5 star', () => {
    cy.navigateMenu('Movies', 'Top Box Office');
    cy.get('[data-testid="chart-layout-main-column"]>ul>li').eq(1).children().first().click();
    cy.get('[data-testid="hero-rating-bar__user-rating"]').eq(1).click();
    cy.get('[aria-label="Rate 5"]').click({force: true});
    cy.get('.ipc-rating-prompt__rating-container > .ipc-btn').click();
    cy.get('#signin-options > :nth-child(1) > h1').should('have.text', 'Sign in');
  })

  it('looks for the second photo of Danny Trejo from Breaking Bad', () => {
    cy.navigateMenu('TV Shows', 'Top 250 TV Shows');
    cy.get('h3').contains('Breaking Bad').click();
    cy.get('[data-testid="hero__photo-link"]').click();
    cy.get('[data-testid="mv-gallery-button"]').click();
    cy.get('[data-testid="image-chip-dropdown-test-id"]').click();  // image filter button
    cy.get('[data-testid="select-dropdown-test-id"]').first().select('Danny Trejo (6)');
    cy.get('[data-testid="promptable__x"] > .ipc-icon-button').click();
    cy.get('[alt]').filter((_, el) => {
      return /Danny Trejo/.test(el.getAttribute('alt'));
    }).eq(1).click();
    cy.screenshot({ capture: 'viewport' });
  })

  it('finds the 3rd celebrity whose birthday was yesterday', () => {
    cy.navigateMenu('Celebs', 'Born Today');
    cy.get('.ipc-chip-list__scroller').click(); // close filter
    cy.get('[data-testid="accordion-item-birthdayAccordion"] > .ipc-accordion__item__title').click();

    let date = new Date();
    date.setDate(date.getDate() - 1); // yesterday date
    let yesterday = date.getDate();
    let month = date.getMonth() + 1;  // starts with 0, that is why we need the +1
    let formattedYesterday = `${month}-${yesterday}`;

    cy.get('[data-testid="birthday-input-test-id"]').focus().type(formattedYesterday);
    cy.get('[data-testid="accordion-item-birthdayAccordion"] > .ipc-accordion__item__title').click();
    cy.get('[data-testid="adv-search-get-results"]').click();
    cy.get('h3').eq(2).click();
    cy.get('[data-testid="hero-parent"]').screenshot();
  })

  if (Cypress.browser.family === 'chromium') { // realPress only supports chromium
    it('finds the 1st celebrity born 40 years ago', () => {
      cy.navigateMenu('Celebs', 'Born Today');
      cy.get('.ipc-chip-list__scroller').click(); // close filter
      cy.get('[data-testid="accordion-item-birthDateAccordion"] > .ipc-accordion__item__title').click();
      cy.get('[data-testid="birthDate-start"]').click();
  
      const years = 40
      //  find and open the date picker
      cy.realPress("Tab");
      if (Cypress.browser.name == 'chrome') {
        cy.realPress("Tab").realPress("Tab");
      }
      cy.realPress("Space");
      // find and open the year selector
      cy.realPress("Tab").realPress("Tab").realPress("Tab");
      cy.realPress("Enter");
      // find and select the proper year
      for(let i = 0; i < years; i++){
        cy.realPress("PageUp");
      }
      cy.realPress("Enter").realPress("Enter");

      let date = new Date();
      let today = date.getDate();
      let currentMonth = date.getMonth() + 1;
      let fortyYearsAgo = date.getFullYear() - years;
      let formattedFortyYearsAgo = `${fortyYearsAgo}-${currentMonth}-${today}`;
      
      cy.get('[data-testid="birthDate-end"]').click().type(formattedFortyYearsAgo);
      cy.get('[data-testid="accordion-item-birthDateAccordion"] > .ipc-accordion__item__title').click();  // enable search button
      cy.get('[data-testid="adv-search-get-results"]').click();
      cy.get('[data-testid="dli-bio"]').eq(0).then($body => {
        if ($body.find("a").length) {
          cy.wrap($body).find("a").eq(0).click();
        }
      });
      cy.screenshot({ capture: 'viewport' });
    })
  }
})