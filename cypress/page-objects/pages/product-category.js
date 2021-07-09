import {SearchResultsPage} from './search-results';
import {CartComponent} from '../components/add-cart';

export class ProductCategory {
  url = '/product-category/';

  navigate(category){
    cy.visit(this.url + category);
  }

  addProductToCart(productTitle){
    SearchResultsPage.elements.getProductCardByText(productTitle).within(() => {
      CartComponent.addProduct();
      CartComponent.viewCart();
    });
  }

}

export const ProductCategoryPage = new ProductCategory();
