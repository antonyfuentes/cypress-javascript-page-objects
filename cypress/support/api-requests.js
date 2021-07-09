
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

}

export const APIRequest = new API();
