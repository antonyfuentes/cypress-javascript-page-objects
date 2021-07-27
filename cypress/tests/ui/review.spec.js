/// <reference types="cypress" />
import { APIRequest } from '../../support/api-requests';
import { ProductDetailPage } from '../../page-objects/pages/product-detail'
import { reviewsComponent } from '../../page-objects/components/product-review'

describe('Account details page tests', () => {

    const productID = 39
    const review = `This shirt was reviewed during the bootcamp on ${new Date()}`
  
    before('Create Review for test', () => {
        APIRequest.createReviewForProduct(productID, review)
    });

    after('Clean up and delete review', () => {
        APIRequest.deleteReviewForProduct()
    })


    it('should be able to see a review for a product', () => {
        ProductDetailPage.navigate('vneck-tee/')
        reviewsComponent.open()
        reviewsComponent.getReview().should('contain.text', review)
    });
});
