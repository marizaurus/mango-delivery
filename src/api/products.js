import db from '../../db.json';

export default function(instance) {
  return {
    getProducts() {
      if (process.env.NODE_ENV === 'production') {
        return db['products'];
      } else {
        return instance.get('products');
      }
    },

    getProductInfo() {
      if (process.env.NODE_ENV === 'production') {
        return db['product-info'];
      } else {
        return instance.get('product-info');
      }
    },

    getComments() {
      if (process.env.NODE_ENV === 'production') {
        return db['comments'];
      } else {
        return instance.get('comments');
      }
    },
  }
}