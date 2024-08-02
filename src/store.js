import { configureStore } from '@reduxjs/toolkit';
import globalStateReducer from './slices/globalState/action';
import { dummyJsonApi } from './api/dummyJson';

export const store = configureStore({
  reducer: {
    globalState: globalStateReducer,
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
  },
  middleware: (gDM) => gDM().concat(dummyJsonApi.middleware),
});
