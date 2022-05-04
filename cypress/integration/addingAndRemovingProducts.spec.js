/// <reference types="Cypress" />

describe('Testing adding and removing from the cart', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('testing if every product is adding to the cart', () => {

        cy.get('ul li').find('button').click({ multiple: true })

    })

    it('removing items from the cart', () => {

        cy.get('ul li').find('button').first().click()

        cy.get('.cartEl')
            .find('a')
            .should('contain', 'Go to Cart')
            .click()

        cy.get('.qty-actions')
            .find('.minus-alt')
            .click()

    })

})