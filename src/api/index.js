import instance from './instance';

import accountModule from './account';
import editorModule from './editor';
import productsModule from './products';
import restaurantsModule from './restaurants';
import cartModule from './cart';

export default {
  account: accountModule(instance),
  editor: editorModule(instance),
  products: productsModule(instance),
  restaurants: restaurantsModule(instance),
  cart: cartModule(instance),
};