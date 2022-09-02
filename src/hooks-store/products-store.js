import { initStore } from './store';


// fake async task that takes 4 seconds to resolve
const fakePostRequest = (productId) => {
  console.log(`Posting : ${productId} to analytics`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`${productId} successfully posted to analytics!`)
        resolve();
    }, 4000);
  });
}

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (curState, dispatch, productId) => {
      const prodIndex = curState.products.findIndex(p => p.id === productId);
      const newFavStatus = !curState.products[prodIndex].isFavorite;
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        isFavorite: newFavStatus
      };
      // debugger;

      dispatch('POST_TO_ANALYTICS', productId);

      return { products: updatedProducts };
    },
    // POST_TO_ANALYTICS : (curState, dispatch, productId) => {
    //   //this action doesn't change the state, but it has a corresponding sideEffect
    //   return { products: curState.products }
    // },
    SET_TOUCHED: (curState, dispatch, productId) => {
      const prodIndex = curState.products.findIndex(p => p.id === productId);
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        touched: true
      };

      // debugger;

      return { products: updatedProducts };
    }
  };

  const sideEffects = {
   POST_TO_ANALYTICS: async (curState, dispatch, payload) => {
        console.log(`POST_TO_ANALYTICS sideEffect is running for product ${payload} `, 'globalState is: ', curState,'payload is :', payload);
        try {
          // fake call to post data to an Data analytics API
          // this is just an example, you might not do this in real life analytics
          await fakePostRequest(payload);
          // debugger;
          dispatch('SET_TOUCHED', payload);
        } catch(error) {
          // analytics post failed, let's not dispatch the action then to mark it as TOUCHED
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