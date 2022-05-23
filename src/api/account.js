import db from '../../db.json';

export default function(instance) {
  return {
    getProfile() {
      if (process.env.NODE_ENV === 'production') {
        return db.profile;
      } else {
        return instance.get('profile');
      }
    },

    getAddresses() {
      if (process.env.NODE_ENV === 'production') {
        return db.addresses;
      } else {
        return instance.get('addresses');
      }
    },

    getOrders() {
      if (process.env.NODE_ENV === 'production') {
        return db.orders;
      } else {
        return instance.get('orders');
      }
    },

    getOrder(id) {
      if (process.env.NODE_ENV === 'production') {
        return db.orderDetails.find(el => el.orderNum == id);
      } else {
        return instance.get(`orderDetails?orderNum=${id}&singular=1`);
      }
    },
  }
}