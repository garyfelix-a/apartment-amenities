// const initialState = {
//     apartmentRatings: [],
// };

// const rootReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case 'ADD_RATING':
//             return {
//                 ...state,
//                 apartmentRatings: [...state.apartmentRatings, action.payload],
//             };
//         default:
//             return state;
//     }
// }

// export default rootReducer;

import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: [],
  reducers: {
    addRating: (state, action) => {
      state.push(action.payload); // Append new review to the array
    },
  },
});

export const { addRating } = reviewsSlice.actions;
export default reviewsSlice.reducer;

