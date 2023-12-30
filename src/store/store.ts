import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "./authSlice"
import ShipListFilter from "./ShipFilterSlice"
import OrderStatusFilter from "./OrderStatusFilter";
import OrderDateFilter from "./OrderDateFilter";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
        user: authReducer,
        filter: ShipListFilter,
        filter_status:OrderStatusFilter,
        filter_date:OrderDateFilter
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)