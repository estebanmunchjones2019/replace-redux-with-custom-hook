import { initStore } from './store';


// fake async task that takes 4 seconds to resolve
const fakePostRequest = (payload) => {
  console.log(`Posting : ${payload.productId} to analytics as favourite ${payload.newFavStatus}`);
  // this fakes sending the value of productId & newFavStatus to an analytics service everytime the button is clicked
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`${payload.productId} successfully posted to analytics!`)
        resolve();
    }, 4000);
  });
}

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (curState, dispatch, payload) => {
      const prodIndex = curState.products.findIndex(p => p.id === payload.productId);
      const newFavStatus = !curState.products[prodIndex].isFavorite;
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        isFavorite: newFavStatus
      };

      dispatch('POST_TO_ANALYTICS', { productId: payload.productId, newFavStatus });

      return { products: updatedProducts };
    },
    SET_TIMES_CLICKED: (curState, dispatch, payload) => {
      const prodIndex = curState.products.findIndex(p => p.id === payload.productId);
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        timesClicked: curState.products[prodIndex].timesClicked + 1
      };

      return { products: updatedProducts };
    }
  };

  const sideEffects = {
   POST_TO_ANALYTICS: async (curState, dispatch, payload) => {
        console.log(`POST_TO_ANALYTICS sideEffect is running for product ${payload.productId} `, 'globalState is: ', curState,'payload is :', payload);
        try {
          // fake call to post data to an Data analytics API
          // this is just an example, you might not do this in real life analytics
          await fakePostRequest(payload);
          dispatch('SET_TIMES_CLICKED', {productId: payload.productId});
        } catch(error) {
          // analytics post failed, let's not dispatch the action to mark it as clicked
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
        timesClicked: 0
      },
      {
        id: 'p2',
        title: 'Blue T-Shirt',
        description: 'A pretty blue t-shirt.',
        isFavorite: false,
        timesClicked: 0
      },
      {
        id: 'p3',
        title: 'Green Trousers',
        description: 'A pair of lightly green trousers.',
        isFavorite: false,
        timesClicked: 0
      },
      {
        id: 'p4',
        title: 'Orange Hat',
        description: 'Street style! An orange hat.',
        isFavorite: false,
        timesClicked: 0
      }
    ],
  });
};

export default configureStore;