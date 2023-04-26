import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			state.push(action.payload);

			AsyncStorage.setItem("myArray", JSON.stringify(state));
		},
		removeFavorite: (state, action) => {
			const filteredState = state.filter((item) => item !== action.payload);
			state.splice(0, state.length, ...filteredState);

			AsyncStorage.setItem("myArray", JSON.stringify(state));
		},
	},
});

export const loadFavorites = () => async (dispatch) => {
	try {
		const storedArray = await AsyncStorage.getItem("myArray");
		if (storedArray !== null) {
			const arr = JSON.parse(storedArray);
			arr.forEach((favorite) => dispatch(addFavorite(favorite)));
		}
	} catch (e) {
		console.log(e);
	}
};

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
