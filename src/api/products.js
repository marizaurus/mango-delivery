import db from '../../db.json';

export default function(instance) {
  return {
    getProducts() {
      if (process.env.NODE_ENV === 'production') {
        return db['products'];
      } else {
        return instance.get('products')
      }
    }
  }
}