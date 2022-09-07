import { initStore } from './store';


const configureStore = () => {
  const actions = {
        SET_POSTS: (curState, dispatch, data) => {
            debugger;
            return { posts: [...data] };
            }
    }

  const sideEffects = {
   FETCH_POSTS: async (curState, dispatch, payload) => {
       debugger;
        try {
            if (!curState.posts) {
                const rawData = await fetch("https://jsonplaceholder.typicode.com/posts");
                const data = await rawData.json();
                dispatch('SET_POSTS', data);
            }
        } catch(error) {
          return;
        }
    }
  }

  initStore(actions, sideEffects, {
    posts: []
  });
};

export default configureStore;