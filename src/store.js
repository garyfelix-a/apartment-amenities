// import { configureStore } from 'redux';
// import rootReducer from './reducers';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

// src/store.js
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer
});

export default store;

