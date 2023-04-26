import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { HomeScreen, FavoritesScreen } from "../screens";

const BottomTab = createBottomTabNavigator();

export default function AppNavigator() {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name="HomeStack"
				component={HomeNavigator}
				options={{
					headerShown: false,
					title: "Home",
					tabBarIcon: () => <TabBarIcon name="home-outline" color={"black"} />,
				}}
			/>
			<BottomTab.Screen
				name="FavoritesStack"
				component={FavoritesNavigator}
				options={{
					headerShown: false,
					title: "Favorites",
					tabBarIcon: () => (
						<MaterialCommunityIcons
							size={30}
							style={{ marginBottom: -3 }}
							name="star-outline"
							color="black"
						/>
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

function TabBarIcon(props) {
	return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const HomeStack = createNativeStackNavigator();
function HomeNavigator() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="HomeScreen" component={HomeScreen} />
		</HomeStack.Navigator>
	);
}

const FavoritesStack = createNativeStackNavigator();
function FavoritesNavigator() {
	return (
		<FavoritesStack.Navigator>
			<FavoritesStack.Screen
				name="FavoritesScreen"
				component={FavoritesScreen}
			/>
		</FavoritesStack.Navigator>
	);
}
