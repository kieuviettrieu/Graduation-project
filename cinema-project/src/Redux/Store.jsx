import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import { combineReducers } from 'redux';
import authReducer from './Reducers';

// Cấu hình redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Kết hợp các reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
});

// Tạo store và persistStore
const store = createStore(rootReducer);
const persistor = persistStore(store);

export { store, persistor };
