import { initStore } from './store';

const configureStore = () => {
  const actions = {
        SET_POSTS: (curState, dispatch, data) => {
            return { posts: [...data] };
            },
    }

  const sideEffects = {
   FETCH_POSTS: async (curState, dispatch, payload) => {
        try {
          const rawData = await fetch("https://jsonplaceholder.typicode.com/posts");
          const data = await rawData.json();
          dispatch('SET_POSTS', data);
        } catch(error) {
          return;
        }
    }
  }

  initStore(actions, sideEffects, {
    posts: [],
  });
};

export default configureStore;