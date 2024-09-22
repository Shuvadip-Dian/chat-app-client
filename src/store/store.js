// import {configureStore} from '@reduxjs/toolkit';
// import userSlice  from './userSlice.js';
// import messageSlice from './messageSlice.js';
// import socketSlice from './socketSlice.js'

// const store = configureStore({
//     reducer:{
//        user: userSlice,
//        message:messageSlice,
//        socket:socketSlice
//     }
// })

// export default store

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredPaths: ['socket.socket'],
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      },
    }),
});

export default store;
