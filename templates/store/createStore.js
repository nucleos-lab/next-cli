import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import reducers


// Create the main reducer
const Reducers = combineReducers({ });

// Create the init function for multiple entry point
export default createStore(
    Reducers,
    {},
    composeWithDevTools()
);