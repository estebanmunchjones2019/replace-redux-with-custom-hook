import React, { useMemo} from 'react';

import Card from '../UI/Card';
import { useStore, } from '../../hooks-store/store';
import './ProductItem.css';

const ProductItem = props => {

  // we're just interested in dispatching and action, not in reading the state 
  const dispatch = useStore()[1];

  // debugger;

  const toggleFavHandler = () => {
    // toggleFav(props.id);
    // the problem is that when dispatch is called, triggers the
    // re-render of this component first, and then of the parent.
    // That's why I get this error 
    // Warning: Cannot update a component (`ProductItem`) while rendering a different component (`ProductItem`). To locate the bad setState() call inside `ProductItem`, follow the stack trace as described in https://fb.me/setstate-in-render
    // in ProductItem (at Products.js:15)
    // in ul (at Products.js:13)
    // in Products (created by Context.Consumer)
    // in Route (at App.js:13)
    // in main (at App.js:12)
    // in App (at src/index.js:14)
    // in Router (created by BrowserRouter)
    // in BrowserRouter (at src/index.js:13)

    // the difference with using state is that dispatch function wasn't triggering a re-render of this component first
    // because we were calling the setStates as they were stored in the list (from parents to children).

    dispatch({ type: 'TOGGLE_FAV', payload: props.id });
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
