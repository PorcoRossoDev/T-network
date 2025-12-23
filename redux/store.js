// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import customerReducer from "./slices/customerSlice";
import estateFormReducer from "./slices/estateFormSlice";
import estateReducer from "./slices/estateSlice";
import clientReducer from "./slices/clientSlice";
import notificationReducer from "./slices/notificationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"], // Chỉ lưu user slice
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    customers: customerReducer,
    estateForm: estateFormReducer,
    estate: estateReducer,
    clients: clientReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra serializable cho AsyncStorage
    }),
});

export const persistor = persistStore(store);
