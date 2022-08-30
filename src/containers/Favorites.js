import React, { useContext } from 'react';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import { useStore } from '../hooks-store/store';
import './Products.css';

const Favorites = props => {
  // const state = useStore()[0];
  //test here
  const [state, dispatch] = useStore()[0];
  dispatch('ADD_ORDER', 'new_order');
  console.log('new_order_state', state.orders)

  const favoriteProducts = state.products.filter(p => p.isFavorite);
  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
