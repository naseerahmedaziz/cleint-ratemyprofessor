// store.js

import { createStore } from 'redux';

// Reducer
const tokenReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      const newState = {
        ...state,
        token: action.payload,
      };
      console.log('New State:', newState); // Adding a console log statement for state changes
      return newState;
    default:
      return state;
  }
};

// Create store
const store = createStore(tokenReducer);

export default store;
