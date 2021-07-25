/// <reference types="cypress" />

import {APIRequest} from '../../support/api-requests';

describe('Product tests', () => {

    it('sku should not be empty for a product', () => {
        APIRequest.findProductByID(39).then((product_body) => {
            expect(product_body.sku).not.be.empty
        })
      });
});
