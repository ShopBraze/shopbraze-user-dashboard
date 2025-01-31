import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers/reducers";
import { middlewares } from "./middlewares/middlewares";

const store = configureStore({
  reducer: {
    // ltmFilters: ltmFilters
    ...reducers
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares)
})


export default store