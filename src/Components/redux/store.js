import { createStore } from 'redux';

// Reducer
const tokenReducer = (state = { token: null, userId: null, firstName: null, lastName: null, email: null, university: null, teacherId: null }, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SAVE_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    case 'SAVE_FIRST_NAME':
      return {
        ...state,
        firstName: action.payload,
      };
    case 'SAVE_LAST_NAME':
      return {
        ...state,
        lastName: action.payload,
      };
    case 'SAVE_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SAVE_UNIVERSITY':
      return {
        ...state,
        university: action.payload,
      };
    case 'SAVE_TEACHER_ID':
      return {
        ...state,
        teacherId: action.payload,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(
  tokenReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;