/// <reference types="Cypress" />

describe('Veryfing amount of clicked product in the cart', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('adding first element to the cart and check the price and prices', () => {

        cy.get('ul li').find('button').first().click()

        cy.get('.cartEl')
            .find('a')
            .should('contain', 'Go to Cart')
            .click()

        cy.get('.cartEl').find('span').then(($btn) => {
            const txt = $btn.text()
            cy.get('.cartEl').find('span').should(($btn2) => {
                expect($btn2.text()).to.eq(txt)
            })
        })

        cy.get(".price").should('contain', '$41.57')
    })

    it('adding second element to the cart and check the price', () => {

        cy.get('ul li').find('button').eq(0).click()
        cy.get('ul li').find('button').eq(1).click()

        cy.get('.cartEl')
            .find('a')
            .should('contain', 'Go to Cart')
            .click()

        cy.get('.cartEl').find('span').then(($btn) => {
            const txt = $btn.text()
            cy.get('.cartEl').find('span').should(($btn2) => {
                expect($btn2.text()).to.eq(txt)
            })
        })

        cy.get(".summary p").should('contain', '$91.56')
        
    })

})