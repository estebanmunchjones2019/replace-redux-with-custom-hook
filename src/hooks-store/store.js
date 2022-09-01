import { useState, useEffect } from 'react';

let globalState = {};

let listeners = [];

let actions = {};

let sideEffects = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = async (actionIdentifier, payload) => {
     // async actions here:
    //switch statement do something with the new or old state?
    // debugger;
    if (sideEffects[actionIdentifier]) {
      await sideEffects[actionIdentifier](globalState, dispatch);
    }
   ;
  
    const newState = actions[actionIdentifier](globalState, payload);

    globalState = { ...globalState, ...newState };

    console.log(globalState);

    for (const listener of listeners) {
      listener(globalState);
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
