import { initStore } from './store';

const configureStore = () => {
  //the actions object is just an object with keys that are the identifiers, and then, the value is a function that takes state and a payload,
  // and returns the new state. It's a hybrid of a Redux action and reducer
  const actions = {
    TOGGLE_FAV: (curState, productId) => {
      const prodIndex = curState.products.findIndex(p => p.id === productId);
      const newFavStatus = !curState.products[prodIndex].isFavorite;
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        isFavorite: newFavStatus
      };
      return { products: updatedProducts };
    }
  };
  //init the store with the actions object and the initial global state for the products slice
  initStore(actions, {
    products: [
      {
        id: 'p1',
        title: 'Red Scarf',
        description: 'A pretty red scarf.',
        isFavorite: false
      },
      {
        id: 'p2',
        title: 'Blue T-Shirt',
        description: 'A pretty blue t-shirt.',
        isFavorite: false
      },
      {
        id: 'p3',
        title: 'Green Trousers',
        description: 'A pair of lightly green trousers.',
        isFavorite: false
      },
      {
        id: 'p4',
        title: 'Orange Hat',
        description: 'Street style! An orange hat.',
        isFavorite: false
      }
    ]
  });
};

//it's exported, so this function can be called somewhere in the app, e.g index.js
export default configureStore;