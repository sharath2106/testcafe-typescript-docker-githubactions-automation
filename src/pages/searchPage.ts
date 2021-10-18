import { Selector, t } from 'testcafe';
import { logger } from '../utils/logger';

export class SearchPage {
  private searchBar = Selector('#search_query_top');
  private searchButton = Selector('button.button-search');
  private searchResults = Selector('.page-heading .heading-counter');
  private productsMatchingCriteria = Selector(
    'div#center_column > .grid.product_list.row'
  );
  private searchResultsInDropDown = Selector('.ac_even');
  private productPage = Selector('#center_column');
  private addToCart = Selector('#add_to_cart');
  private productTitle = Selector('h1');

  async searchProduct(product: string): Promise<void> {
    await t.typeText(this.searchBar, product);
    logger.info('Entered search text in the search bar');
  }

  async clickSearch(): Promise<void> {
    await t.click(this.searchButton);
    logger.info('Clicked on search button');
  }

  async validateSearchResults(
    numberOfResults: string,
    searchResultsMessage: string
  ): Promise<void> {
    const searchResultsOnPage = this.searchResults.innerText;

    await t.expect(this.productPage.visible).ok();
    const listOfProducts: number = await this.productsMatchingCriteria.find(
      'li.ajax_block_product'
    ).count;
    await t.expect(searchResultsOnPage).eql(searchResultsMessage);
    await t.expect(listOfProducts).eql(Number(numberOfResults));
    logger.info('Search results are validated');
  }

  async selectProductFromDropDown(): Promise<void> {
    await t.click(this.searchResultsInDropDown);
    logger.info('Select product from the search drop down');
  }

  async validateProductPage(productName: string): Promise<void> {
    await t.expect(this.productPage.visible).ok();
    await t.expect(this.productTitle.innerText).eql(productName);
    await t.expect(this.addToCart.visible).ok();
    logger.info('User landed on the product page');
  }
}
