import db from '../../db.json';

export default function(instance) {
  return {
    getRestaurant() {
      if (process.env.NODE_ENV === 'production') {
        return db['restaurant-edit'];
      } else {
        return instance.get('restaurant-edit')
      }
    }
  }
}