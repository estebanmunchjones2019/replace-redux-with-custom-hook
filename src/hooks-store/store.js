import { useState, useEffect } from 'react';

//the global state, initialized later on when calling initStore in another file.
let globalState = {};
//listeners are an array of setState functions, for each component that calls the custom hook
let listeners = [];

//the actions object, which hold the type and a payload, initialized later when calling initStore in another file.
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    //dispatch function is included in the return array, so it's accessed by each interested component
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      //every scoped state for each component, must be updated with the newGlobal state, so each components re-renders, to react to new values
      //it's like calling setState() for each interested component (that have their own setState function asociated).
      listener(globalState);
    }
  };

  //it runs on every component re-render if no dependancy array is passed. It only runs here when the component did mount. 
  //There's an unmounting clean up function.
  useEffect(() => {
    //when component did mount, it's setState function is added to the list
    listeners.push(setState);
    //clean up function
    return () => {
      //as this is a closure, setState function is kind of trapped inside the outer anonymous function, and can be referenced  in the clean up 
      //if it weren't a closure, would be hard to know with setState function corresponds to what component.
      listeners = listeners.filter(li => li !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

//initStore is exported so all the initial global state and actions are stored in other file
//this initStore can be called in many places of the app, like when using combineReducers in Redex, to build a big global State adding multiple state slices.
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
