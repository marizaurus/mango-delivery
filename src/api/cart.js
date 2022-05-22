import db from '../../db.json';

export default function(instance) {
  return {
    getCart() {
      if (process.env.NODE_ENV === 'production') {
        return db['cart'];
      } else {
        return instance.get('cart');
      }
    },

    getBookingData() {
      if (process.env.NODE_ENV === 'production') {
        return db['booking'];
      } else {
        return instance.get('booking');
      }
    }
  }
}