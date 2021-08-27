import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import initState from './initState';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, initState(), applyMiddleware(thunk));

export default store;
