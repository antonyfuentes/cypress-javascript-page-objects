export class ProductReview {
  
    elements = {
      getReviewsLink: () => cy.get('#tab-title-reviews')
    };
  
    open(){
      this.elements.getReviewsLink().click();
    }

    getReviewByID(reviewID) {
        return cy.get(`div#comment-${reviewID} .description`)
    }

    
  
  }
  
  export const reviewsComponent = new ProductReview();
