/// <reference types="cypress" />

describe('Cart page tests', () => {

    it('should receive a 200 error when GETting a product', () => {
        cy.request({
            method: 'GET',
            url: 'wp-json/wc/v3/products/39',
            auth: {
                username: 'automation',
                password: 'automation'
            }
        }).then((response) => {
            expect(response.body.sku).not.be.empty
        })
      });
});
