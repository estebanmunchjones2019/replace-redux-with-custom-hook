import { initStore } from './store';


// fake async task that takes 3 seconds to resolve
const fakeFetchCall = (data) => {
  console.log('start of http call to POST some data');
  return new Promise((resolve, reject) => {
    const error = Math.random() > 0.5 ? true : false;
    setTimeout(() => {
        console.log('data successfuly posted!')
        resolve();
    }, 4000);
  });
}

const configureStore = () => {
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
    },
    ADD_ORDER: (curState, productId) => {
      console.log('ADD_ORDER dispatched');
      return { orders:[...curState.orders, Math.random()] };
    }
  };

  const sideEffects = {
   TOGGLE_FAV: async (globalState, dispatch, payload) => {
        console.log('TOGGLE_FAV sideEffect', 'globalState: ', globalState,'payload :', payload);
        await fakeFetchCall();
        dispatch('ADD_ORDER', null);
    }
  }

  initStore(actions, sideEffects, {
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
    ],
    orders: []
  });
};

export default configureStore;