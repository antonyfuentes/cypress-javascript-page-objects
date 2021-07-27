export class ProductReview {
  
    elements = {
      getReviewsLink: () => cy.get('#tab-title-reviews')
    };
  
    open(){
      this.elements.getReviewsLink().click();
    }

    getReview() {
      return cy.get('@reviewId').then((reviewId) => {
        return cy.get(`div#comment-${reviewId} .description`)
      });
    }

    
  
  }
  
  export const reviewsComponent = new ProductReview();
