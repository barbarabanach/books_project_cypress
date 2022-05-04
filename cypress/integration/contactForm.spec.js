/// <reference types="Cypress" />

describe('Form Tests', () => {

    it('opens the form page and fills in the form', () => {
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



        cy.get('form').then(firstForm => {
            //labels
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

        


            // cy.get('.card')
            //     .find('button')
            //     .should('contain', 'ORDER AND PAY')
            //     .click()




            // cy.contains('nb-card', 'Basic form').then(secondForm => {
            //     const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
            //     expect(passwordLabelFirst).to.equal(passwordLabelSecond)

            //     cy.wrap(secondForm).find('[for="exampleInputPassword1"]')
            // })
        })



    })

    it('fff', () => {

        cy.visit('/')

        cy.get('ul li').find('button').first().click()

        // cy.get('.cartEl')
        //     .find('a')
        //     .should('contain', 'Go to Cart')

        cy.get('ul li').find('button').eq(1).click()

        

        cy.get('.cartEl span').then((elem) => {
            const listingCount = Cypress.$(elem).length;
            console.log("List of Counts:" + listingCount);
            //or 
            cy.log(listingCount);
        })
    })

    it('fff', () => {
        cy.visit("/")

        cy.get('ul li').find('button').first().click()

        //4: Click on ADD TO CART
        cy.get('.cartEl')
            .find('a')
            .should('contain', 'Go to Cart')
            .click()

        //6: Verify the unit price $41.57
        //cy.get(".product-unit-price").contains("$41.57")
        // cy.get(".price").should('contain', '$41.57')


        //7: Enter Quantity 2
        cy.get(".plus-alt").click()

        //8: Update shopping cart
        cy.get(".cartEl span").should('contain', '$83.14')

        //9: Verify Total  $83.14
        // cy.get(".value-summary > strong").contains('$83.14')

        // cy.get(".summary > p")
        //     .should(($total) => {
        //         expect($total).to.contain('$83.14')
        //     })
    })

    it.only('', () => {

        cy.visit("/")

        cy.get('ul li').find('button').first().click()

        // cy.get('ul li').find('button').eq(1).click()

        //4: Click on ADD TO CART
        cy.get('.cartEl')
            .find('a')
            .should('contain', 'Go to Cart')
            .click()


        cy.get('.cartEl').find('span').then(($btn) => {

            // store the button's text
            const txt = $btn.text()
            // compare the two buttons' text
            // and make sure they are the same
            cy.get('.cartEl').find('span').should(($btn2) => {
                expect($btn2.text()).to.eq(txt)
            })
        })

        // cy.get('.cartEl')
        //     .find('span')
        //     .contains('2')
            // .then(listing => {
            //     const listingCount = Cypress.$(listing);
                
            //     //expect(listing).to.have.length(listingCount);

            //     expect(listing).to.equal(listingCount)
            // });



           // OK

        // cy.get('.price', { timeout: 2000 })
        //     .then(function ($ele) {
        //         const currentPrice = $ele.text();
        //         cy.wrap(currentPrice).as('currentPrice')  // save to Cypress alias 
        //     })


    })
})