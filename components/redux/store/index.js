import {createStore, applyMiddleware, combineReducers} from 'redux';
import {root_reducer} from '../reducer/root_reducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

//import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist:['BuyerReducer'],
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, root_reducer);

export const store = createStore(persistedReducer);
export const per_store = persistStore(store)

