export const addRating = (rating) => {
    return {
        type: 'ADD_RATING',
        payload: rating,
    };
};