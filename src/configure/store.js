var Redux = require('redux');
var { signUpReducer , fetchData} = require('../reducer/reducer');
import { applyMiddleware } from "redux"
var thunk = require('redux-thunk').default;
var logger = require("redux-logger")

export var storeConfig = function () {
    var reducer = Redux.combineReducers({

        loginsignupReducer: signUpReducer,
        data:fetchData
    });

    const middleWare = applyMiddleware(thunk, logger())
    var store = Redux.createStore(reducer, middleWare);

    return store;
}