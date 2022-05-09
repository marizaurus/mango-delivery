import instance from './instance';

import editorModule from './editor';
import productsModule from './products';

export default {
  editor: editorModule(instance),
  products: productsModule(instance),
};