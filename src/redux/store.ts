import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/AuthSlice';
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/bikeProduct/productSlice";
import { baseApi } from './api/baseApi';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'totalQuantity', 'totalPrice', 'userId'],
};

const productPersistConfig = {
  key: 'products',
  storage,
  whitelist: ['products'], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCardReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedProductReducer = persistReducer(productPersistConfig, productReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCardReducer,
    products: persistedProductReducer, 
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
