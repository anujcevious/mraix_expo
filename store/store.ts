import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./silce/favoritesSlice";
import authReducer from "./silce/auth/authSlice";
import globalSettingReducer from "./silce/globalSettingSlice";
import companyReducer from "./silce/companySlice";
import sidebarReducer from "./silce/sidebarSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    auth: authReducer,
    globalSetting: globalSettingReducer,
    company: companyReducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
