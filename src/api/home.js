import db from '../../db.json';

export default function(instance) {
  return {
    getBlocks() {
      if (process.env.NODE_ENV === 'production') {
        return db['home-blocks'];
      } else {
        return instance.get('home-blocks');
      }
    },
  }
}