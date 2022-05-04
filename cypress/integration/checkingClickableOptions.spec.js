/// <reference types="cypress" />

describe('Testing Home Page', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Check if Books Shop', () => {
        cy.get('header h1').click()
        cy.focused().click()
        cy.contains('Books shop').click()
    })

    it('Check if Go to Cart is clickable', () => {

        cy.get('.cartEl')
            .find('a')
            .should('contain', 'Go to Cart')
            .click()
    })

    it('Check if Add to Cart is clickable', () => {
        cy.get('ul li').find('button').click({ multiple: true })
    })

})
