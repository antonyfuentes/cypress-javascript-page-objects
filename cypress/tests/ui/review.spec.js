/// <reference types="cypress" />
import { APIRequest } from '../../support/api-requests';
import { ProductDetailPage } from '../../page-objects/pages/product-detail'
import { reviewsComponent } from '../../page-objects/components/product-review'

describe('Account details page tests', () => {

    const productID = 39
    const review = `This shirt was reviewed during the bootcamp on ${new Date()}`
    let reviewID
  
    before('Create Review for test', () => {
        APIRequest.createReviewForProduct(productID, review).then((id) => {
            reviewID = id
        })
    });

    after('Clean up and delete review', () => {
        APIRequest.deleteReviewForProduct(reviewID)
    })


    it('should be able to see a review for a product', () => {
        ProductDetailPage.navigate('vneck-tee/')
        reviewsComponent.open()
        reviewsComponent.getReviewByID(reviewID).should('contain.text', review)
    });
});
