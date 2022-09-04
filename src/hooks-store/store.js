import { useReducer, useEffect } from 'react';

let globalState = {};

let listeners = [];

let actions = {};

function globalReducer(state, action) {
  // debugger;
  const newState = actions[action.type] ?
  actions[action.type](globalState, action.payload) :
  {...globalState}
  
  globalState = {...globalState, ...newState};

  // we'r not interesting in updating the component scoped state given by useReducer,
  // so we don't return anything. We have a reserved action called 'UPDATE_STATE'
  if (action.type !== 'UPDATE_STATE') {
    for (const listener of listeners) {
      listener({type: 'UPDATE_STATE'})
     };
  } 

  return {...globalState};
}


export const useStore = () => {
  //let's keep state from the hook and global state in sync
  // when state changes, components are re-rendered

  const [state, dispatch] = useReducer(globalReducer, globalState);

  useEffect(() => {
    // subscribe component on componentDidMount
    listeners.push(dispatch);
    // unsubscribe component when destroyed
    return () => {
      console.log('component has been unsubscribed');
      listeners = listeners.filter(li => li !== dispatch);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return [state, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};







