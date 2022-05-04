/// <reference types="Cypress" />

describe('Test Form', () => {

    it('Test Form with validation', () => {
        cy.visit('/')

        cy.get('ul li').find('button').first().click()

        cy.get('.cartEl')
            .find('a')
            .should('contain', 'Go to Cart')
            .click()

        cy.get('.summary')
            .find('a')
            .should('contain', 'NEXT STEP')
            .click()


        cy.contains('Fill in the next fields')
        cy.get('form').then(firstForm => {

            const firstNameLabel = firstForm.find('[for="name"]').text()
            expect(firstNameLabel).to.equal('First Name')

            const lastNameLabel = firstForm.find('[for="surname"]').text()
            expect(lastNameLabel).to.equal('Last Name')

            const placeLabel = firstForm.find('[for="place"]').text()
            expect(placeLabel).to.equal('Place')

            //inputs
            // const firstNameInput = firstForm.find('#name').type();

            cy.get('.card').find('form').then(formElem => {
                cy.wrap(formElem).find('#name').type('Jan')
                cy.wrap(formElem).find('#surname').type('Kowalski')
                cy.wrap(formElem).find('#place').type('New York')
                cy.wrap(formElem).find('#postalCode').type('00322')
                cy.wrap(formElem).find('#number').type('+00 000 000 000')
                cy.wrap(formElem).find('#email').type('nd@nied.com')
                // cy.wrap(formElem).find('.captcha-area').should('be.visible')

                // cy.get(formElem).eq(0).contains('[]]').click();

                cy.wrap(formElem).find('#discountCode').type('TUTORE12')
                cy.wrap(formElem).find('.discount_field > button').click()
                cy.wrap(formElem).find('button').should('contain', 'ORDER AND PAY')

            })

            cy.get('.card')
                .find('button').eq(2)
                .should('contain', 'ORDER AND PAY')
                .click()
        })

    })

})