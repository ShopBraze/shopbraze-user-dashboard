import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers/reducers";
import { middlewares } from "./middlewares/middlewares";
import authReducer from "./auth/auth";
import userProfileReducer from "./user-profile/user-profile"
import appDataReducer from "./app-data/app-data"

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    appData: appDataReducer,
    ...reducers
  },
  devTools: process.env.NODE_ENV === "production" ? false : true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares)
})


export default store