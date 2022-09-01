import { useState, useEffect } from 'react';

let globalState = {};

let listeners = [];

let actions = {};

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

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = async (actionIdentifier, payload) => {
     // async actions here:
    //switch statement do something with the new or old state?
    switch (actionIdentifier) {
      case 'TOGGLE_FAV':
        await fakeFetchCall();
        break;
    }
    debugger;
    const newState = actions[actionIdentifier](globalState, payload);

    globalState = { ...globalState, ...newState };
    


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

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
