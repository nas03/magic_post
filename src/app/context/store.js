import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import myReducer from './reducers/index'

const middleware = [ thunk ]
const myStore = createStore(
    myReducer,
//    applyMiddleware(...middleware)
)

export default myStore