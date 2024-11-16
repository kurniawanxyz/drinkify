import { Stack } from "expo-router";
import { ExpoTamaguiProvider } from "../providers";
import Toast from "react-native-toast-message";


export default function RootLayout() {
  return (
    <ExpoTamaguiProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen
                name="index"
                />

            <Stack.Screen
              name="register"
              options={{
                animation: "fade_from_bottom"
              }}
            />
        </Stack>
        <Toast/>
    </ExpoTamaguiProvider>
  )
}
