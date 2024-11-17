import { router, Tabs } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { handleFetch } from "../../utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Atur handler untuk notifikasi
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Fungsi untuk menangani error saat registrasi
function handleRegistrationError(errorMessage: string) {
  console.error(errorMessage);
}

// Fungsi untuk registrasi push notification
async function registerForPushNotificationsAsync() {
  let token: string | undefined;

  // Buat channel notifikasi untuk Android
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // Proses registrasi untuk perangkat fisik
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      handleRegistrationError("Failed to get push token for push notification!");
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ||
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found. Check your Expo configuration.");
      }

      token = (
        await Notifications.getExpoPushTokenAsync({ projectId })
      ).data;

      console.log("Expo Push Token:", token);
    } catch (error) {
      handleRegistrationError(`Error while fetching Expo Push Token: ${error}`);
    }
  } else {
    handleRegistrationError("Must use physical device for Push Notifications.");
  }

  return token;
}

// Custom hook untuk mengawasi notifikasi
function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    // Memeriksa notifikasi terakhir
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response.notification);
    });

    // Listener untuk notifikasi baru
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

// Komponen utama UserLayout
export default function UserLayout() {
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    // Registrasi push notification
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token ?? "");
        if (token) {
          (async () => {
            try {
              await handleFetch("/token", {
                method: "POST",
                data: {
                  token,
                },
              });
            } catch (error) {
              console.error("Error saving token to server:", error);
            }
          })();
        }
      })
      .catch((error) =>
        setExpoPushToken(`Error during registration: ${error}`)
      );

    // Menambahkan listener untuk notifikasi
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response:", response);
      }
    );

    // Membersihkan listener saat unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // Gunakan custom hook untuk observer notifikasi
  useNotificationObserver();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        // headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title:"Home",
          headerShown:false,
          tabBarIcon: (props) => (
            <FontAwesome name="home" color={props.color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reminder"
        options={{
          title: "Reminder",
          tabBarIcon: (props) => (
            <FontAwesome name="clock-o" color={props.color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: (props) => (
            <FontAwesome name="user" color={props.color} />
          ),
        }}
      />
    </Tabs>
  );
}
