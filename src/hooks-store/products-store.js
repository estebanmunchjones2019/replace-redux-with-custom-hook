import { initStore } from './store';


// fake async task that takes 3 seconds to resolve
const fakePostRequest = (productId) => {
  console.log(`Post request started, with productId : ${productId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`${productId} successfully posted!`)
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
    SET_TOUCHED: (curState, productId) => {
      const prodIndex = curState.products.findIndex(p => p.id === productId);
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        touched: true
      };

      return { products: updatedProducts };
    }
  };

  const sideEffects = {
   TOGGLE_FAV: async (globalState, dispatch, payload) => {
        console.log('TOGGLE_FAV sideEffect is running', 'globalState is: ', globalState,'payload is :', payload);
        try {
          // fake call to post data to an Data analytics API
          // this is just an example, you might not do this in real life analytics
          await fakePostRequest(payload);
          dispatch('SET_TOUCHED', payload);
        } catch(error) {
          // don't dispatch the action
          return;
        }
    }
  }

  initStore(actions, sideEffects, {
    products: [
      {
        id: 'p1',
        title: 'Red Scarf',
        description: 'A pretty red scarf.',
        isFavorite: false,
        touched: false
      },
      {
        id: 'p2',
        title: 'Blue T-Shirt',
        description: 'A pretty blue t-shirt.',
        isFavorite: false,
        touched: false
      },
      {
        id: 'p3',
        title: 'Green Trousers',
        description: 'A pair of lightly green trousers.',
        isFavorite: false,
        touched: false
      },
      {
        id: 'p4',
        title: 'Orange Hat',
        description: 'Street style! An orange hat.',
        isFavorite: false,
        touched: false
      }
    ],
  });
};

export default configureStore;