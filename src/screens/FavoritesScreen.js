import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = () => {
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
	const pressedObjectIds = useSelector((state) => state.favorite);

	const deleteFavorites = async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			// clear error
		}

		console.log("Done.");
	};

	return (
		<ScrollView style={{ backgroundColor: "white" }}>
			{pressedObjectIds.map((e, _i) => (
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
							{myArray[e - 1].name}, {myArray[e - 1].age}
						</Text>
						<Text style={{ color: "white", fontFamily: "OpenSansRegular" }}>
							{myArray[e - 1].city}
						</Text>
						<Text style={{ color: "white", fontFamily: "OpenSansRegular" }}>
							ID: {myArray[e - 1].id}
						</Text>
					</View>
					<TouchableOpacity onPress={() => dispatch(removeFavorite(e))}>
						<Ionicons name="close" size={24} color="red" />
					</TouchableOpacity>
				</View>
			))}
			<TouchableOpacity
				style={{
					width: 200,
					height: 50,
					borderRadius: 10,
					backgroundColor: "gray",
					alignSelf: "center",
					justifyContent: "center",
					alignItems: "center",
				}}
				onPress={() => deleteFavorites()}
			>
				<Text
					style={{
						color: "white",
						fontSize: 18,
						fontFamily: "OpenSansRegular",
					}}
				>
					Delete All
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default FavoritesScreen;
