import React from 'react';
import {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux';
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import {createStore} from "redux";
import reducers from "./authorization/reducers/index";

const persistConfig = {key: 'auth', storage};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);

render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
