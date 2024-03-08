import { createSlice } from "@reduxjs/toolkit";

const initialLngState = {
    lng:       localStorage.getItem('lng') || null,
    direction: localStorage.getItem('direction') || 'ltr'
};

const LngSlice = createSlice({
    name: "lng",
    initialState: initialLngState,
    reducers: {
        setLng: (state, action) => {
            state.lng = action.payload.lng;
            state.direction = action.payload.direction;
            localStorage.setItem('lng',action.payload.lng);
            localStorage.setItem('direction',action.payload.direction);
        }
    },
});
export const { setLng } = LngSlice.actions;

export default LngSlice.reducer;

