
export class API {

  findProductByName(productName){
    return cy.request({
      method: 'GET',
      url: '/wp-json/wc/v3/products',
      auth: {
        user: Cypress.env('ECOMMERCE_USER'),
        pass: Cypress.env('ECOMMERCE_PASS')
      }
    }).then((resp) => {
      const result = resp.body.filter(( item ) => item.name == productName)

      if (result.length ) {
        return result[0].id
      } else {
        throw new Error(`API response: Product name not found "${productName}"`);
      }

    });
  }

  addProductToCart(productName) {
    this.findProductByName(productName).then((productId) => {
      cy.request({
        method: 'POST',
        url: '/?wc-ajax=add_to_cart',
        body: {
          product_sku: '',
          product_id: productId,
          quantity: 2
        },
        form: true
      });
    });
  }

  findProductByID(productId) {
    return cy.request({
      method: 'GET',
      url: `wp-json/wc/v3/products/${productId}`,
      auth: {
        user: Cypress.env('ECOMMERCE_USER'),
        pass: Cypress.env('ECOMMERCE_PASS')
      }
  }).then((resp) => {
      return resp.body
    });
  }

  createReviewForProduct(productId, review) {
    cy.request({
      method: 'POST',
      url: 'wp-json/wc/v3/products/reviews',
      auth: {
        user: Cypress.env('ECOMMERCE_USER'),
        pass: Cypress.env('ECOMMERCE_PASS')
      },
      body: {
        product_id: productId,
        review: review,
        reviewer: "John Doe",
        reviewer_email: "john.doe@mail.com",
        rating: 5
      }
  }).then((resp) => {
    cy.wrap(resp.body.id).as('reviewId')
    });
  }

  deleteReviewForProduct() {
    cy.get('@reviewId').then((reviewId) => {
      cy.request({
        method: 'DELETE',
        url: `/wp-json/wc/v3/products/reviews/${reviewId}?force=true`,
        auth: {
          user: Cypress.env('ECOMMERCE_USER'),
          pass: Cypress.env('ECOMMERCE_PASS')
        }
      });
    });
  }
}

export const APIRequest = new API();
