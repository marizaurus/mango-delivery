import db from '../../db.json';

export default function(instance) {
  return {
    getRestaurants() {
      if (process.env.NODE_ENV === 'production') {
        return db['restaurants'];
      } else {
        return instance.get('restaurants')
      }
    },

    getRestaurant() {
      if (process.env.NODE_ENV === 'production') {
        return db['restaurant'];
      } else {
        return instance.get('restaurant')
      }
    }
  }
}