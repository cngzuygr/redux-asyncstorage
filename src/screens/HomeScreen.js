import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import {
	addFavorite,
	loadFavorites,
	removeFavorite,
} from "../features/favoriteSlice";

import * as Notifications from "expo-notifications";

const HomeScreen = () => {
	const myArray = [
		{ id: 1, name: "John", age: 30, city: "New York" },
		{ id: 2, name: "Jane", age: 25, city: "Los Angeles" },
		{ id: 3, name: "Bob", age: 40, city: "Chicago" },
		{ id: 4, name: "Alice", age: 35, city: "Houston" },
		{ id: 5, name: "David", age: 28, city: "Miami" },
		{ id: 6, name: "Emily", age: 33, city: "San Francisco" },
		{ id: 7, name: "Tom", age: 45, city: "Seattle" },
		{ id: 8, name: "Lisa", age: 27, city: "Boston" },
		{ id: 9, name: "Mike", age: 38, city: "Denver" },
		{ id: 10, name: "Sarah", age: 42, city: "Washington DC" },
		{ id: 11, name: "Chris", age: 31, city: "Dallas" },
		{ id: 12, name: "Amanda", age: 29, city: "Phoenix" },
		{ id: 13, name: "Kevin", age: 37, city: "Portland" },
		{ id: 14, name: "Michelle", age: 26, city: "San Diego" },
		{ id: 15, name: "Eric", age: 44, city: "Atlanta" },
		{ id: 16, name: "Karen", age: 32, city: "Philadelphia" },
		{ id: 17, name: "Daniel", age: 39, city: "Austin" },
		{ id: 18, name: "Jessica", age: 28, city: "Las Vegas" },
		{ id: 19, name: "Steven", age: 36, city: "Nashville" },
		{ id: 20, name: "Kelly", age: 30, city: "Charlotte" },
		{ id: 21, name: "Peter", age: 43, city: "Minneapolis" },
		{ id: 22, name: "Olivia", age: 24, city: "Salt Lake City" },
		{ id: 23, name: "Mark", age: 34, city: "Kansas City" },
		{ id: 24, name: "Samantha", age: 31, city: "Orlando" },
		{ id: 25, name: "Greg", age: 46, city: "Cleveland" },
		{ id: 26, name: "Vanessa", age: 27, city: "San Antonio" },
		{ id: 27, name: "Adam", age: 35, city: "Raleigh" },
		{ id: 28, name: "Maria", age: 38, city: "Sacramento" },
		{ id: 29, name: "Andrew", age: 29, city: "Detroit" },
		{ id: 30, name: "Lauren", age: 33, city: "St. Louis" },
	];

	const dispatch = useDispatch();
	const [favorites, setFavorites] = useState([]);
	const pressedObjectIds = useSelector((state) => state.favorite);

	useEffect(() => {
		dispatch(loadFavorites());
	}, [dispatch]);

	const handlePress = async (id) => {
		if (favorites.includes(id)) {
			let arr = favorites;
			let newArr = arr.filter((item) => item !== id);
			dispatch(removeFavorite(id));
			setFavorites(newArr);
		} else {
			if (favorites.length > 9) {
				await schedulePushNotification();
				return;
			} else {
				dispatch(addFavorite(id));
				setFavorites((prevIDs) => [...prevIDs, id]);
			}
		}
	};

	return (
		<ScrollView style={{ backgroundColor: "white" }}>
			{myArray.map((e, _i) => (
				<View
					key={_i}
					style={{
						width: "90%",
						backgroundColor: "#00000077",
						borderRadius: 10,
						marginBottom: 10,
						padding: 10,
						alignSelf: "center",
						overflow: "hidden",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<View>
						<Text
							style={{
								color: "white",
								marginBottom: 5,
								fontFamily: "OpenSansRegular",
							}}
						>
							{e.name}, {e.age}
						</Text>
						<Text style={{ color: "white", fontFamily: "OpenSansRegular" }}>
							{e.city}
						</Text>
						<Text style={{ color: "white", fontFamily: "OpenSansRegular" }}>
							ID: {e.id}
						</Text>
					</View>
					<TouchableOpacity onPress={() => handlePress(e.id)}>
						<Ionicons
							size={30}
							name="heart-outline"
							color={pressedObjectIds.includes(e.id) ? "red" : "white"}
						/>
					</TouchableOpacity>
				</View>
			))}
		</ScrollView>
	);
};

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "You have exceeded your limit!",
			body: "You can only have 10 favorites.\n In order to add more you must remove another from your favorites.",
		},
		trigger: null,
	});
}

export default HomeScreen;

const styles = StyleSheet.create({
	text: {},
});
