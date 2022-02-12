import { createStore, combineReducers, applyMiddleware } from 'redux';
import {persistStore,persistReducer} from "redux-persist";
import thunk from 'redux-thunk';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loginReducer} from './redux/reducers/loginReducer';

const rootReducers = combineReducers({
    loginReducer
  })

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['loginReducer']
};


const persistReducers = persistReducer(persistConfig,rootReducers)

const store = createStore(persistReducers,applyMiddleware(thunk))

const persistor = persistStore(store)

export {persistor, store}
