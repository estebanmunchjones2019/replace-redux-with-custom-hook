import { useState, useEffect } from 'react';

let globalState = {};

let listeners = [];

let actions = {};

let sideEffects = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = async (actionIdentifier, payload) => {
    if (sideEffects[actionIdentifier]) {
      await sideEffects[actionIdentifier](globalState, dispatch, payload);
    }
    const newState = actions[actionIdentifier] ? actions[actionIdentifier](globalState, dispatch, payload) : { ...globalState };
  
    globalState = { ...globalState, ...newState };

    console.log(`after running action: ${actionIdentifier} action for ${payload} product`,  'the updated globalState is: ', globalState );

    for (const listener of listeners) {
      listener(globalState)
    }
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter(li => li !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, userSideEffects, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
  sideEffects = { ...sideEffects, ...userSideEffects}
};
