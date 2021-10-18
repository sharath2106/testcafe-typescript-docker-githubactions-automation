import { SearchPage } from '../pages/searchPage';
import { getBaseUrl } from '../utils/helpers';
import { LoginPage } from '../pages/loginPage';

const searchData = require('../../data/search-data.json');
const loginPage = new LoginPage();
const searchPage = new SearchPage();

fixture`Search for product in the application`
  .page(getBaseUrl(process.env.ENVIRONMENT));

searchData.forEach((data) => {
  test.meta({ feature: 'search', category: 'sanity' })(
    `User should be able to search for ${data.searchText} and validate the search results`,
    async () => {
      await searchPage.searchProduct(data.searchText);
      await searchPage.clickSearch();
      await searchPage.validateSearchResults(data.results, data.searchMessage);
    }
  );
});

test.meta({ feature: 'search', category: 'sanity' })(
  'User should be able to select a product from the search result drop down and land on the product page',
  async () => {
    const productName = 'Faded Short Sleeve T-shirts';
    await searchPage.searchProduct(productName);
    await searchPage.selectProductFromDropDown();
    await searchPage.validateProductPage(productName);
  }
);
