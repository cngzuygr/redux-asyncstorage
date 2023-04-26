import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import Navigation from "./src/navigation";
import { ActivityIndicator } from "react-native";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {
	const [fonts] = useFonts({
		OpenSansRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
	});

	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	const [isLoading, setIsLoading] = useState(false);

	if (isLoading || !fonts) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size={"large"} color={"red"} />
			</View>
		);
	}

	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	);
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		// console.warn("Must use physical device for Push Notifications");
	}

	return token;
}
